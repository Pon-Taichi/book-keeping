import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-journal-entry',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatTableModule,
        MatInputModule,
        MatGridListModule,
        ReactiveFormsModule,
    ],
    template: `
        <form [formGroup]="journalGroup" (ngSubmit)="onSubmit()">
            <div class="date-and-partner">
                <mat-form-field appearance="outline" class="date">
                    <mat-label for="date">日付</mat-label>
                    <input
                        matInput
                        id="date"
                        type="date"
                        formControlName="date"
                    />
                </mat-form-field>

                <mat-form-field appearance="outline" class="partner">
                    <mat-label for="partner">取引先</mat-label>
                    <input
                        matInput
                        id="partner"
                        type="text"
                        formControlName="partner"
                    />
                </mat-form-field>
            </div>
            <div class="journal-form">
                <div class="debit">
                    <mat-form-field appearance="outline" class="account-name">
                        <mat-label for="debit-account">借方科目</mat-label>
                        <input
                            matInput
                            id="debit-account"
                            type="text"
                            formControlName="debitAccount"
                        />
                    </mat-form-field>

                    <mat-form-field appearance="outline" class="amount">
                        <mat-label for="debit-amount">金額</mat-label>
                        <input
                            matInput
                            id="debit-amount"
                            type="text"
                            formControlName="debitAmount"
                        />
                    </mat-form-field>
                </div>

                <div class="credit">
                    <mat-form-field appearance="outline" class="account-name">
                        <mat-label for="credit-account">貸方科目</mat-label>
                        <input
                            matInput
                            id="credit-account"
                            type="text"
                            formControlName="creditAccount"
                        />
                    </mat-form-field>

                    <mat-form-field appearance="outline" class="amount">
                        <mat-label for="credit-amount">金額</mat-label>
                        <input
                            matInput
                            id="credit-amount"
                            type="text"
                            formControlName="creditAmount"
                        />
                    </mat-form-field>
                </div>
            </div>

            <div class="submit-button">
                <button mat-raised-button color="primary" type="submit">
                    保存
                </button>
            </div>
        </form>
    `,
    styleUrls: ['./journal-entry.component.scss'],
})
export class JournalEntryComponent {
    constructor(private form: FormBuilder) {}

    journalGroup = this.form.group({
        date: this.form.control<Date | null>(null),
        partner: this.form.control<string>(''),
        debitAccount: this.form.control<string>(''),
        debitAmount: this.form.control<number | undefined>(undefined),
        creditAccount: this.form.control<string>(''),
        creditAmount: this.form.control<number | undefined>(undefined),
    });

    onSubmit() {
        console.log(this.journalGroup.value);
    }
}
