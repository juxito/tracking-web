import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotificationService {

  constructor(private snack: MatSnackBar) {}

  // 🔵 SUCCESS
  success(message: string) {
    this.snack.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: ['snackbar-success'] // 👈 clase CSS custom
    });
  }

  // 🔴 ERROR
  error(message: string) {
    this.snack.open(message, 'Cerrar', {
      // duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['snackbar-error']
    });
  }

  // 🟡 WARNING
  warning(message: string) {
    this.snack.open(message, 'Cerrar', {
      duration: 3500,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snackbar-warning']
    });
  }

  // 🔵 INFO
  info(message: string) {
    this.snack.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: ['snackbar-info']
    });
  }
}