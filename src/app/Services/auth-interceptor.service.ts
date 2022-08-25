import { Injectable } from '@angular/core';

import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpErrorResponse,
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
// import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {

    if (sessionStorage.getItem('auth-user') && sessionStorage.getItem('auth-token')) {
      let token:string=sessionStorage.getItem("auth-token")+"";
      req = req.clone({
        headers: new HttpHeaders()
          .set('Authorization',token)
          .set("isRefreshToken","true")
      })
      console.log(req);
      
    }
    
    return next.handle(req);
  }
  
}
