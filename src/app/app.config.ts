import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; // <-- IMPORTANTE
import { routes } from './app.routes';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';

import { provideAnimations } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { retryInterceptor } from './core/interceptors/retry.interceptor';
import { cacheInterceptor } from './core/interceptors/cache.interceptor';
import { circuitBreakerInterceptor } from './core/interceptors/circuit-breaker.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideAnimations(), // <-- necesario para Angular Material
    // provideHttpClient() // <-- ACTIVAR AQUÍ PARA PODER HACER PETICIONES API
    provideHttpClient(
      withInterceptors([
        loadingInterceptor, // 🔥 orden importa
        // retryInterceptor, // REALIZAR INTENTOS DE REQUEST AUTOMÁTICOS
        errorInterceptor,
        // circuitBreakerInterceptor, // PROTECCIÓN ANTE FALLAS REPETIDAS
        // cacheInterceptor // CACHÉ GLOBAL DE RESPUESTAS (opcional, usar con cuidado)
      ])
    )
  ]
};

// function provideAnimations(): import("@angular/core").Provider | import("@angular/core").EnvironmentProviders {
//   throw new Error('Function not implemented.');
// }
