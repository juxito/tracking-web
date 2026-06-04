import { Injectable, signal } from '@angular/core';

/**
 * Servicio global para controlar loading UI
 */
@Injectable({ providedIn: 'root' })
export class LoadingService {

  // 🔥 contador para múltiples requests concurrentes
  private _count = signal(0);

  loading = this._count.asReadonly();

  show() {
    this._count.update(v => v + 1);
  }

  hide() {
    this._count.update(v => Math.max(0, v - 1));
  }
}