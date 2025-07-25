import { ApplicationConfig, inject, provideZoneChangeDetection } from "@angular/core";
import { provideRouter, Router } from "@angular/router";

import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from "@angular/common/http";
import {
  provideClientHydration,
  withEventReplay,
} from "@angular/platform-browser";
import { routes } from "./app.routes";
import { AuthInterceptor } from "./services/auth/auth.interceptor";
import { AuthService } from "./services/auth/auth.service";
import { catchError, throwError } from "rxjs";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        (req, next) => {
          const token = inject(AuthService).getToken();
          const router = inject(Router)

          if (token) {
            const newReq = req.clone({
              headers: req.headers.append("Authorization", `Bearer ${token}`),
            });
            return next(newReq).pipe(catchError((error: HttpErrorResponse) => {
              console.log('error', error);
              if (error.status === 401) {
                localStorage.removeItem('auth_token');
                router.navigate(['/login']);
              }
              return throwError(() => error);
            }))
          }

          return next(req);
        },
      ])
    ),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
}; 