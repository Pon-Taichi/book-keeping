import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-journal-entry',
    standalone: true,
    imports: [CommonModule],
    template: `
        <p>{{ message }}</p>
        <button mat-raised-button (click)="log()">ログ</button>
    `,
    styles: [],
})
export class JournalEntryComponent {
    constructor(private http: HttpClient) {}

    message = 'journal-entry works';

    async log() {
        const result = await firstValueFrom(this.http.get<Hello>('/api/hello'));
        this.message = result.value;
    }
}

type Hello = {
    value: string;
};
