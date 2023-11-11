import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
    ],
    template: `
        <mat-drawer-container class="drawer">
            <mat-drawer class="sidebar" mode="side" opened>
                <mat-nav-list class="menu-list">
                    <h3 class="title">{{ title }}</h3>
                    <mat-list-item matListItemTitle class="menu-item">
                        <mat-icon matListItemIcon>playlist_add</mat-icon>
                        <a routerLink="/records">仕訳入力</a>
                    </mat-list-item>
                    <mat-list-item matListItemTitle class="menu-item">
                        <mat-icon matListItemIcon>account_balance</mat-icon>
                        <a routerLink="/records">個別財務諸表</a>
                    </mat-list-item>
                </mat-nav-list>
            </mat-drawer>
            <mat-drawer-content class="container">
                <mat-toolbar class="header">
                    <span class="spacer"></span>
                    <button
                        mat-icon-button
                        class="manage_accounts-icon"
                        aria-label="manage accounts icon"
                    >
                        <mat-icon>manage_accounts</mat-icon>
                    </button>
                </mat-toolbar>
                <div class="content">
                    <router-outlet></router-outlet>
                </div>
            </mat-drawer-content>
        </mat-drawer-container>
    `,
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = '個別会計システム';
}
