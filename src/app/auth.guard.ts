import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string) {
    if (this.authService.getIsLoggedInStatus() == true) {
      this.authService.redirectUrl = url;
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
