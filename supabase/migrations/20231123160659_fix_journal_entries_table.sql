-- 仕訳データをマイグレーション用一時テーブルに移行
create table journal_entries_tmp as select * from journal_entries;

-- 仕訳テーブルのデータを削除
truncate table journal_entries;
alter sequence journal_entries_id_seq restart with 1;

-- 仕訳テーブルのjournal_entry_type, account_id, amountカラムを削除
alter table journal_entries drop constraint journal_entries_account_id_fkey;
alter table journal_entries drop column type;
alter table journal_entries drop column account_id;
alter table journal_entries drop column amount;

create table debit_entries (
    id serial primary key,
    journal_entry_id integer not null,
    account_id integer not null,
    amount integer not null,
    summary text,
    created_at timestamp with time zone default current_timestamp,
    updated_at timestamp with time zone default current_timestamp,

    foreign key (journal_entry_id) references journal_entries (id),
    foreign key (account_id) references accounts (id)
);

create table credit_entries (
    id serial primary key,
    journal_entry_id integer not null,
    account_id integer not null,
    amount integer not null,
    summary text,
    created_at timestamp with time zone default current_timestamp,
    updated_at timestamp with time zone default current_timestamp,

    foreign key (journal_entry_id) references journal_entries (id),
    foreign key (account_id) references accounts (id)
);

alter table debit_entries enable row level security;
alter table credit_entries enable row level security;

create policy select_debit_entries on debit_entries for select using (true);
create policy select_credit_entries on credit_entries for select using (true);
create policy insert_debit_entries on debit_entries for insert with check (true);
create policy insert_credit_entries on credit_entries for insert with check (true);

-- 仕訳テーブルに仕訳単位で集約したデータ追加
insert into journal_entries (date, partner, created_at, updated_at)
select date, partner, created_at, max(updated_at) from journal_entries_tmp
group by date, partner, created_at
order by created_at;

-- 仕訳テーブルのデータを移行、joural_entry_typeがdebitの場合はdebit_entriesテーブルに、creditの場合はcredit_entriesテーブルに移行
-- journal_entry_idは仕訳テーブルのidを参照、
insert into debit_entries (journal_entry_id, account_id, amount, created_at, updated_at)
select j2.id as journal_entry_id, j1.account_id, j1.amount, j1.created_at, j1.updated_at
from journal_entries_tmp j1
inner join journal_entries j2
    on j2.date = j1.date
    and j2.partner = j1.partner
    and j2.created_at = j1.created_at
    and j2.updated_at = j1.updated_at
where j1.type = 'debit'
order by j2.id;

insert into credit_entries (journal_entry_id, account_id, amount, created_at, updated_at)
select j2.id as journal_entry_id, j1.account_id, j1.amount, j1.created_at, j1.updated_at
from journal_entries_tmp j1
inner join journal_entries j2
    on j2.date = j1.date
    and j2.partner = j1.partner
    and j2.created_at = j1.created_at
    and j2.updated_at = j1.updated_at
where j1.type = 'credit'
order by j2.id;

-- 仕訳作成用関数
create or replace function create_journal_entry(param jsonb)
returns void as $$
declare
	journal_id int;
begin
	insert into journal_entries(date, partner)
	select * from jsonb_to_record(param) as (date date, partner text)
	returning id into journal_id;

	raise notice 'journal_id %', journal_id;

	insert into debit_entries(journal_entry_id, account_id, amount)
	select journal_id as journal_id, * from jsonb_to_recordset(param -> 'debitEntries')
	as (account int, amount int);
	
	insert into credit_entries(journal_entry_id, account_id, amount)
	select journal_id as journal_id, * from jsonb_to_recordset(param -> 'creditEntries')
	as (account int, amount int);
end;	
$$ language plpgsql;