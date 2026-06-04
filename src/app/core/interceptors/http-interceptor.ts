import { HttpInterceptorFn } from '@angular/common/http';

/**
 * Interceptor base
 * Se ejecuta en TODAS las peticiones HTTP
 */
export const httpInterceptor: HttpInterceptorFn = (req, next) => {

  // 🔥 puedes modificar request aquí (headers, auth, etc)
  const cloned = req.clone({
    setHeaders: {
      'Content-Type': 'application/json'
    }
  });

  return next(cloned);
};