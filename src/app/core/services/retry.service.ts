// src/app/core/services/retry.service.ts
import { Injectable, signal } from '@angular/core';

export interface RetryState {
  retrying: boolean;
  attempt: number;
  secondsLeft: number;
}

@Injectable({ providedIn: 'root' })
export class RetryService {
  readonly state = signal<RetryState>({
    retrying: false,
    attempt: 0,
    secondsLeft: 0,
  });

  private countdown: ReturnType<typeof setInterval> | null = null;

  startRetry(attempt: number, delayMs: number) {
    this.clearCountdown();

    let secondsLeft = Math.ceil(delayMs / 1000);

    this.state.set({ retrying: true, attempt, secondsLeft });

    this.countdown = setInterval(() => {
      secondsLeft--;

      if (secondsLeft <= 0) {
        this.clearCountdown();
        this.state.set({ retrying: false, attempt: 0, secondsLeft: 0 });
      } else {
        this.state.update(s => ({ ...s, secondsLeft }));
      }
    }, 1000);
  }

  reset() {
    this.clearCountdown();
    this.state.set({ retrying: false, attempt: 0, secondsLeft: 0 });
  }

  private clearCountdown() {
    if (this.countdown) {
      clearInterval(this.countdown);
      this.countdown = null;
    }
  }
}