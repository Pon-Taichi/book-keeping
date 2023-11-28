import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { JPDateAdapter } from '../date-adapter';
import { AccountService } from '../services/account.service';
import { MatSelectModule } from '@angular/material/select';
import { JournalEntryService } from '../services/journal-entry.service';
import { JournalEntryForm } from '../types/journal-entry';

@Component({
    selector: 'app-journal-entry',
    standalone: true,
    providers: [{ provide: DateAdapter, useClass: JPDateAdapter }],
    imports: [
        CommonModule,
        MatButtonModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatTableModule,
        MatInputModule,
        MatGridListModule,
        MatIconModule,
        MatDatepickerModule,
        MatSelectModule,
        MatNativeDateModule,
        ReactiveFormsModule,
    ],
    templateUrl: './journal-entry.component.html',
    styleUrls: ['./journal-entry.component.scss'],
})
export class JournalEntryComponent implements OnInit, OnDestroy {
    constructor(
        private form: FormBuilder,
        private accountService: AccountService,
        private journalEntryService: JournalEntryService
    ) {}

    accountOptions: { id: number; name: string; type: string }[] = [];
    private subscriptions: Subscription[] = [];

    ngOnInit(): void {
        this.getAccounts();
        this.subscriptions.push(
            this.journalGroup.controls.debitEntries.valueChanges.subscribe(
                () => {
                    this.debitTotal = this.calculateTotal(
                        this.journalGroup.controls.debitEntries
                    );
                }
            ),
            this.journalGroup.controls.creditEntries.valueChanges.subscribe(
                () => {
                    this.creditTotal = this.calculateTotal(
                        this.journalGroup.controls.creditEntries
                    );
                }
            )
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) =>
            subscription.unsubscribe()
        );
    }

    // fetch data

    async getAccounts() {
        const accounts = await this.accountService.getAccounts();
        this.accountOptions = accounts || [];
    }

    // form

    journalGroup = this.form.group(
        {
            date: this.form.control<Date>(new Date(), {
                nonNullable: true,
                validators: Validators.required,
            }),
            partner: this.form.control<string>('', {
                nonNullable: true,
                validators: Validators.required,
            }),

            // 初期値はentryが1つ
            debitEntries: this.form.array<
                FormGroup<{
                    account: FormControl<number>;
                    amount: FormControl<number>;
                }>
            >([this.createEntry()]),
            creditEntries: this.form.array<
                FormGroup<{
                    account: FormControl<number>;
                    amount: FormControl<number>;
                }>
            >([this.createEntry()], Validators.required),
        },
        { validators: this.validateTotals() }
    );

    debitTotal = this.calculateTotal(this.journalGroup.controls.debitEntries);
    creditTotal = this.calculateTotal(this.journalGroup.controls.creditEntries);

    createEntry(): FormGroup {
        return this.form.group({
            account: this.form.control<number>(0, Validators.required),
            amount: this.form.control<number>(0, Validators.required),
        });
    }

    addDebitEntry() {
        this.journalGroup.controls.debitEntries.push(this.createEntry());
    }

    addCreditEntry() {
        this.journalGroup.controls.creditEntries.push(this.createEntry());
    }

    resetJournalForm() {
        this.journalGroup.reset();
        // Mark the form as pristine and untouched
        this.journalGroup.markAsPristine();
        this.journalGroup.markAsUntouched();
    }

    async onSubmit() {
        if (this.journalGroup.invalid) {
            return;
        }

        const formValue: JournalEntryForm = this.journalGroup.getRawValue();

        await this.journalEntryService.createJournalEntry(formValue);
        this.resetJournalForm();
    }

    calculateTotal(entries: FormArray): number {
        return entries.controls
            .map((control) => Number(control.get('amount')?.value) || 0)
            .reduce((acc, value) => acc + value, 0);
    }

    validateTotals(): ValidatorFn {
        return (): ValidationErrors | null => {
            return this.debitTotal !== this.creditTotal
                ? { unequalTotals: true }
                : null;
        };
    }
}
