import { Injectable, signal } from '@angular/core';

/**
 * Servicio global de errores
 */
@Injectable({ providedIn: 'root' })
export class ErrorService {

  private _error = signal<string | null>(null);

  error = this._error.asReadonly();

  show(message: string) {
    this._error.set(message);

    // 🔥 auto-hide (UX real)
    setTimeout(() => this.clear(), 4000);
  }

  clear() {
    this._error.set(null);
  }
}