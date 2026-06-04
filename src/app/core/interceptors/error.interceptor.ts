import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { ErrorService } from '../services/error.service';

/**
 * 🔥 Interceptor GLOBAL de errores
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const errorService = inject(ErrorService);

  return next(req).pipe(
    catchError((err) => {

      let message = 'Ocurrió un error inesperado';

      /**
       * 🔥 TRANSFORMACIÓN BACKEND → MENSAJE USER-FRIENDLY
       */
      if (err.error) {

        // Caso específico que tú tienes
        if (err.error.message?.includes('password')) {
          message = 'La contraseña es obligatoria';
        }

        else if (err.status === 400) {
          message = 'Datos inválidos';
        }

        else if (err.status === 500) {
          message = 'Error en el servidor';
        }
      }

      errorService.show(message);

      return throwError(() => err);
    })
  );
};