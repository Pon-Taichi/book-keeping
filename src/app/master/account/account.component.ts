import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from 'src/app/services/account.service';
import { MatTableModule } from '@angular/material/table';

@Component({
    selector: 'app-account',
    standalone: true,
    imports: [CommonModule, MatTableModule],
    templateUrl: './account.component.html',
    styleUrl: './account.component.scss',
})
export class AccountComponent implements OnInit {
    title = '勘定科目一覧';
    displayedColumns = ['id', 'name', 'type'];
    dataSource: { id: number; name: string; type: string }[] = [];

    constructor(private accountService: AccountService) {}

    ngOnInit() {
        this.getAccounts();
    }

    async getAccounts() {
        const accounts = await this.accountService.getAccounts();
        this.dataSource = accounts || [];
    }
}
