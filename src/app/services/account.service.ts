import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from 'schema';

@Injectable({
    providedIn: 'root',
})
export class AccountService {
    constructor(private client: SupabaseClient<Database>) {}

    async getAccounts() {
        const { data } = await this.client.from('accounts').select('*');
        return data;
    }
}
