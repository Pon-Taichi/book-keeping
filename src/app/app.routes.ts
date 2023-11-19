import { Routes } from '@angular/router';
import { JournalEntryComponent } from './journal-entry/journal-entry.component';
import { AccountComponent } from './master/account/account.component';
import { JournalHistoryComponent } from './journal-history/journal-history.component';

export const routes: Routes = [
    {
        path: 'records',
        component: JournalEntryComponent,
    },
    {
        path: 'accounts',
        component: AccountComponent,
    },
    {
        path: 'history',
        component: JournalHistoryComponent,
    },
    {
        path: '**',
        redirectTo: '/records',
    },
];
