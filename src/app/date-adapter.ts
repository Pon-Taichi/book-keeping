import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';

@Injectable()
export class JPDateAdapter extends NativeDateAdapter {
    override getDateNames(): string[] {
        return [...Array(31)].map((_, i) => String(i + 1));
    }
}
