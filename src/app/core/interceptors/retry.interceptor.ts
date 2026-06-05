import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { retry } from 'rxjs/operators';
import { throwError, timer } from 'rxjs';
import { RetryService } from '../services/retry.service'; // 👈 ajusta el path

const MAX_RETRIES = 4;
const BASE_DELAY = 1000;

export const retryInterceptor: HttpInterceptorFn = (req, next) => {
  const retryService = inject(RetryService); // ✅ inject() funciona en interceptores

  const excluded = ['/auth/login', '/payments'];

  if (excluded.some(url => req.url.includes(url)) || req.method !== 'GET') {
    return next(req);
  }

  return next(req).pipe(
    retry({
      count: MAX_RETRIES,
      delay: (error: HttpErrorResponse, retryCount: number) => {
        if (error.status === 0 || error.status >= 500) {
          const backoff = BASE_DELAY * Math.pow(2, retryCount - 1);
          const jitter = Math.floor(Math.random() * 300);
          const delayTime = backoff + jitter;

          console.log(`Retry #${retryCount} en ${delayTime}ms`);
          retryService.startRetry(retryCount, delayTime); // 👈 notifica

          return timer(delayTime);
        }
        return throwError(() => error);
      },
    })
  );
};