import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CurrencyPipe } from '@angular/common';

// Icons
import { provideIcons } from '@ng-icons/core';
import { lucideCross } from '@ng-icons/lucide';

// Rutas
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),

    provideRouter(routes),

    provideClientHydration(withEventReplay()),
    provideAnimations(),
    CurrencyPipe,

    provideIcons({ lucideCross }),
  ]
};
