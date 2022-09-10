import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    constructor(private matSnackBar: MatSnackBar) {
    }

    success(message: string) {
        this.show(message, 'success');
    }
    
    error(message: string) {
        this.show(message, 'error');
    }

    private show(message: string, cssClasses = '') {
        this.matSnackBar.open(message, 'X', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            panelClass: cssClasses
        });
    }
}