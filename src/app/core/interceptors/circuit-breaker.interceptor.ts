import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { CircuitBreakerService } from '../services/circuit-breaker.service';

export const circuitBreakerInterceptor: HttpInterceptorFn = (req, next) => {

  const breaker = inject(CircuitBreakerService);

  if (!breaker.canRequest()) {
    return throwError(() => new Error('Circuito abierto (backend saturado)'));
  }

  return next(req).pipe(
    tap(() => breaker.recordSuccess()),
    catchError(err => {
      breaker.recordFailure();
      return throwError(() => err);
    })
  );
};