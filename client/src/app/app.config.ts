import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { importProvidersFrom } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


export const appConfig: ApplicationConfig = {
  providers: 
  [provideZoneChangeDetection({ eventCoalescing: true }),
   provideRouter(routes),
   provideAnimations(),
   provideHttpClient(),
   importProvidersFrom(BsDropdownModule.forRoot())
  ]
};


