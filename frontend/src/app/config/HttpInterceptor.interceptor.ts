import {catchError} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Router} from "@angular/router";
import Swal from 'sweetalert2';

@Injectable()
export class HttpInterceptor implements HttpInterceptor {
  constructor(private router: Router) {
  }

  private handleAuthError(err: HttpErrorResponse): Observable<HttpEvent<any>> {
    if (err.status === 401 || err.status === 403)
      this.router.navigateByUrl('/signin');
    Swal.fire({
      text:  err.error.error|| JSON.stringify(err),
      icon: 'error',
    })
    return throwError(err);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('token');
    if (token && !req.url.includes('/api/auth/')) {
      req = req.clone({
        setHeaders: {Authorization: `Bearer ${token}`}
      });
    }
    return next.handle(req).pipe(
      catchError(err => this.handleAuthError(err))
    )

  }
}
