import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JournalEntryService } from '../services/journal-entry.service';
import { MatTableModule } from '@angular/material/table';
@Component({
    selector: 'app-journal-history',
    standalone: true,
    imports: [CommonModule, MatTableModule],
    templateUrl: './journal-history.component.html',
    styleUrl: './journal-history.component.scss',
})
export class JournalHistoryComponent implements OnInit {
    constructor(private journalEntryService: JournalEntryService) {}

    title = '仕訳一覧';
    displayedColumns = ['date', 'type', 'account', 'amount', 'partner'];
    dataSource: {
        date: string;
        type: 'debit' | 'credit';
        amount: number;
        partner: string;
        accounts: {
            name: string;
        } | null;
    }[] = [];

    ngOnInit() {
        this.getJournalEntries();
    }

    async getJournalEntries() {
        const journalEntries =
            await this.journalEntryService.getJournalEntries();
        this.dataSource = journalEntries || [];
    }
}
