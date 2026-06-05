import { HttpInterceptorFn } from '@angular/common/http';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

const cache = new Map<string, any>();

export const cacheInterceptor: HttpInterceptorFn = (req, next) => {

  if (req.method !== 'GET') return next(req);

  const key = req.url;

  // 🔥 devolver cache si existe
  if (cache.has(key)) {
    return of(cache.get(key));
  }

  return next(req).pipe(
    tap(event => {
      cache.set(key, event);
    })
  );
};