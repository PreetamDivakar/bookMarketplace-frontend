// auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  constructor(private authService: AuthServiceService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Retrieve the token (from localStorage, sessionStorage, or a service)
    const token = this.authService.getToken();

    // Clone the request to add the new header
    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      // Pass the cloned request instead of the original request
      return next.handle(cloned);
    }
    
    // If no token, pass the request without the Authorization header
    return next.handle(req);

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Handle 401 Unauthorized Error
          console.error('401 Unauthorized Error: Redirecting to login.');
          this.router.navigate(['/login']); // Navigate to login page
        } else if (error.status === 404) {
          // Handle 404 Not Found Error
          console.error('404 Not Found Error: Redirecting to not-found page.');
          this.router.navigate(['/not-found']); // Navigate to Not Found page
        }
        return throwError(() => error); // Propagate the error
      })
    );
  }
}
