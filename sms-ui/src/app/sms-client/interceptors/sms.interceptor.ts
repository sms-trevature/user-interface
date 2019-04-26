import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CognitoService } from 'src/app/services/cognito.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class SmsInterceptor implements HttpInterceptor {

  private token: string;

  constructor(public cognito: CognitoService) {
    cognito.token$.subscribe(token => {
      this.token = token;
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //console.log(this.token)
    //this.cognito.getCurrentSession();
    this.cognito.someMethod();
    request = request.clone({
      url: `${environment.smsGateway}/${request.url}/`,
      setHeaders: {
        Authorization: `Bearer ${this.token}`
      }
    });
    console.log(request)
    return next.handle(request);
  }
}
