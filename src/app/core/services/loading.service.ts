import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private _loadingCount = signal(0);

  loading = () => this._loadingCount() > 0;

  show() {
    this._loadingCount.update(v => v + 1);
  }

  hide() {
    this._loadingCount.update(v => Math.max(0, v - 1));
  }
}