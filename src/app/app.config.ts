import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { headersInterceptor } from './core/interceptors/headers.interceptor';
import { handleErrorInterceptor } from './core/interceptors/handle-error.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { loaderInterceptor } from './core/interceptors/loader.interceptor';

export const appConfig: ApplicationConfig = {
  providers:
  [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter
    (
      routes,
      withHashLocation(),
      withInMemoryScrolling({scrollPositionRestoration: 'top'})
    ),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch(),
      withInterceptors([headersInterceptor, handleErrorInterceptor, loaderInterceptor])
    ),
    provideAnimations(),
    provideToastr(),
    // importProvidersFrom(NgxSpinnerModule.forRoot({ type: 'line-spin-clockwise-fade-rotating' })),
    // importProvidersFrom(NgxSpinnerModule)
  ]
};
