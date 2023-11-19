import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { createSupabaseClient } from './supabase-client/supabase-client';
import { SupabaseClient } from '@supabase/supabase-js';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideHttpClient(),
        provideAnimations(),
        { provide: MAT_DATE_LOCALE, useValue: 'ja-JP' },
        { provide: SupabaseClient, useFactory: createSupabaseClient },
    ],
};
