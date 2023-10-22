import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
    <div class="header">
      <mat-toolbar class="header-content" color="primary">
        <span class="title">{{ title }}</span>
        <span class="spacer"></span>
        <button
          mat-icon-button
          class="manage_accounts-icon"
          aria-label="manage accounts icon"
        >
          <mat-icon>manage_accounts</mat-icon>
        </button>
      </mat-toolbar>
    </div>

    <mat-drawer-container class="drawer">
      <mat-drawer class="sidebar" mode="side" opened>
        <mat-nav-list class="menu-list">
          <mat-list-item matListItemTitle class="menu-item">
            <mat-icon matListItemIcon>playlist_add</mat-icon>
            <a routerLink="/records"> 仕訳入力 </a>
          </mat-list-item>
        </mat-nav-list>
      </mat-drawer>
      <mat-drawer-content class="container">
        <button mat-raised-button (click)="log()">ログ</button>
        <router-outlet></router-outlet>
      </mat-drawer-content>
    </mat-drawer-container>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private http: HttpClient) {}

  title = '個別会計システム';
  message = 'message';

  async log() {
    const result = await firstValueFrom(this.http.get<Hello>('/api/hello'));
    this.message = result.value;
  }
}

type Hello = {
  value: string;
};
