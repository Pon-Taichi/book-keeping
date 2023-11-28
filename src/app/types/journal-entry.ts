export type JournalEntry = {
    id: number;
    type: 'debit' | 'credit';
    date: string;
    partner: string;
    amount: number;
    account: string;
};

export type JournalEntryForm = {
    date: Date;
    partner: string;
    debitEntries: {
        account: number;
        amount: number;
    }[];
    creditEntries: {
        account: number;
        amount: number;
    }[];
};
