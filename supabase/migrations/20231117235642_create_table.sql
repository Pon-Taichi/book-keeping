-- enum for account type
CREATE TYPE account_type AS ENUM ('asset', 'liability', 'equity', 'revenue', 'expense');

-- enum for journal entry type
CREATE TYPE journal_entry_type AS ENUM ('debit', 'credit');

CREATE TABLE account (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    type account_type NOT NULL
);

CREATE TABLE journal_entry (
    id SERIAL PRIMARY KEY,
    -- 貸借
    type journal_entry_type NOT NULL,
     -- 勘定科目
    account_id INTEGER NOT NULL,
    -- 金額
    amount INTEGER NOT NULL,
    -- 日付
    date date NOT NULL,
    -- 取引先
    partner TEXT NOT NULL,
    -- 摘要
    summary TEXT,
    -- 作成日時
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    -- 更新日時
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES account (id)
);