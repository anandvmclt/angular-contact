import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserLoginGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const isLoggedIn = localStorage.getItem('access_token');
      if (isLoggedIn) {
        return this.router.navigate(['/']);
      } else {
        return true;
      }
    }
    return false;
  }
}
