/* eslint-disable @typescript-eslint/no-explicit-any */

import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from 'schema';

@Injectable({
    providedIn: 'root',
})
export class JournalEntryService {
    constructor(private client: SupabaseClient<Database>) {}

    async getJournalEntries() {
        const { data } = await this.client.from('journal_entries').select(`
            date,
            type,
            amount,
            partner,
            accounts (name)
            `);
        return data;
    }

    async createJournalEntry(
        journalEntry: Database['public']['Tables']['journal_entries']['Insert'][]
    ) {
        await this.client.from('journal_entries').insert(journalEntry);
    }
}
