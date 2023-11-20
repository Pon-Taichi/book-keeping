import { createClient } from '@supabase/supabase-js';
import type { Database } from 'schema';
import { environment } from 'src/environments/environment';

export const createSupabaseClient = () => {
    return createClient<Database>(environment.subabaseUrl, environment.anonkey);
};
