import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JournalEntryService } from '../services/journal-entry.service';
import { MatTableModule } from '@angular/material/table';
import { JournalEntry } from '../types/journal-entry';
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
    displayedColumns = ['id', 'date', 'type', 'account', 'amount', 'partner'];
    dataSource: JournalEntry[] = [];

    ngOnInit() {
        this.getJournalEntries();
    }

    async getJournalEntries() {
        const journalEntries =
            await this.journalEntryService.getJournalEntries();
        this.dataSource = journalEntries || [];
    }
}
