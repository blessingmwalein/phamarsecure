import { Router } from "@angular/router";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  // intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   console.log(this.authService.getAuthDetails());

  //   request = request.clone({
  //     setHeaders: {
  //       'Access-Control-Allow-Headers': 'Content-Type',
  //       'Access-Control-Allow-Origin': '*',
  //       'Authorization': this.authService.isAuthenticated() ? `Bearer ${this.authService.getAuthDetails().token}` : ""
  //     },
  //   });
  //   return next.handle(request);
  // }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: this.authService.isAuthenticated()
          ? `Bearer ${this.authService.getToken()}`
          : "",
      },
    });

    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
          }
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(["auth/login"]);
            }
          }
        }
      )
    );
  }
}
