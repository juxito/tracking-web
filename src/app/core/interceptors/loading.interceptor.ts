import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

import { LoadingService } from '../services/loading.service';

/**
 * Interceptor que controla loading global
 */
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {

  const loading = inject(LoadingService);

  loading.show(); // 🔥 inicia loading

  return next(req).pipe(
    finalize(() => {
      loading.hide(); // 🔥 termina SIEMPRE (éxito o error)
    })
  );
};