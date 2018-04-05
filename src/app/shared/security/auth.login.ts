import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AuthentificationService } from './auth.service';

@Injectable()
export class AuthLogin implements CanActivate {
  constructor(
    private authService: AuthentificationService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.authService.isAuthenticated()) {
      return true;
    }
    this.router.navigate(['dashboard']);
    return false;
  }
}
