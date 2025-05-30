import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { importProvidersFrom } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { provideToastr } from 'ngx-toastr';
import { errorInterceptor } from './_interceptors/error.interceptor';


export const appConfig: ApplicationConfig = {
  providers: 
  [provideZoneChangeDetection({ eventCoalescing: true }),
   provideRouter(routes),
   provideAnimations(),
   provideHttpClient(withInterceptors([errorInterceptor])),
   importProvidersFrom(BsDropdownModule.forRoot()),
   provideToastr({
    positionClass: 'toast-bottom-right'
   })
  ]
};


