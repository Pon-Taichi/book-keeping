export type JournalEntry = {
  date: Date;
  partner: string;
  debit: {
    name: string;
    amount: number;
  }[];
  credit: {
    name: string;
    amount: number;
  }[];
};
