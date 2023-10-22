import { Routes } from '@angular/router';
import { JournalEntryComponent } from './journal-entry/journal-entry.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/records',
    pathMatch: 'full',
  },
  {
    path: 'records',
    component: JournalEntryComponent,
  },
];
