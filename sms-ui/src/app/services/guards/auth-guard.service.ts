import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { CognitoService } from '../cognito.service';

@Injectable()
export class AuthGuard implements CanActivate {


  constructor(private cognito: CognitoService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.cognito.localStorage.length) {
        return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

}