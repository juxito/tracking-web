import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; // <-- IMPORTANTE
import { routes } from './app.routes';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    // provideHttpClient() // <-- ACTIVAR AQUÍ PARA PODER HACER PETICIONES API
    provideHttpClient(
      withInterceptors([
        loadingInterceptor, // 🔥 orden importa
        errorInterceptor
      ])
    )
  ]
};