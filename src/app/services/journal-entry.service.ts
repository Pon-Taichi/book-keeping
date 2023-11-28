/* eslint-disable @typescript-eslint/no-explicit-any */

import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from 'schema';
import { JournalEntry, JournalEntryForm } from '../types/journal-entry';

@Injectable({
    providedIn: 'root',
})
export class JournalEntryService {
    constructor(private client: SupabaseClient<Database>) {}

    async getJournalEntries() {
        const { data } = await this.client.from('journal_entries').select(`
            id,     
            date,
            partner,
            debit_entries (
                amount,
                accounts (name)
            ),
            credit_entries (
                amount,
                accounts (name)
            )
            `);
        if (!data) {
            return null;
        }

        const result: JournalEntry[][] = data.map((entry) => {
            const debitEntries: JournalEntry[] = entry.debit_entries.map(
                (debitEntry) => {
                    return {
                        id: entry.id,
                        type: 'debit',
                        date: entry.date,
                        partner: entry.partner,
                        account: debitEntry.accounts?.name ?? '',
                        amount: debitEntry.amount,
                    };
                }
            );

            const creditEntries: JournalEntry[] = entry.credit_entries.map(
                (creditEntry) => {
                    return {
                        id: entry.id,
                        type: 'credit',
                        date: entry.date,
                        partner: entry.partner,
                        account: creditEntry.accounts?.name ?? '',
                        amount: creditEntry.amount,
                    };
                }
            );

            const array = [...debitEntries, ...creditEntries];
            return array;
        });
        return result.flat();
    }

    async createJournalEntry(journalEntry: JournalEntryForm) {
        const { error } = await this.client.rpc('create_journal_entry', {
            param: journalEntry as never,
        });
        console.log(error);
    }
}
