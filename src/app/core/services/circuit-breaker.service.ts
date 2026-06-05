import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CircuitBreakerService {

  private failures = signal(0);
  private open = signal(false);

  private MAX_FAILURES = 5;
  private RESET_TIME = 10000; // 10s

  canRequest(): boolean {
    return !this.open();
  }

  recordSuccess() {
    this.failures.set(0);
    this.open.set(false);
  }

  recordFailure() {
    const count = this.failures() + 1;
    this.failures.set(count);

    if (count >= this.MAX_FAILURES) {
      this.open.set(true);

      // 🔁 reset automático
      setTimeout(() => {
        this.failures.set(0);
        this.open.set(false);
      }, this.RESET_TIME);
    }
  }
}