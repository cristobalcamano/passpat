import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class Interceptor implements HttpInterceptor {
    constructor(private router: Router){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            retry(1),
            catchError((e: HttpErrorResponse) => {
                
                if(e.status != 200){
                this.router.navigateByUrl('/not-found');
            }
            throw e;
            })
        );
    }
}
