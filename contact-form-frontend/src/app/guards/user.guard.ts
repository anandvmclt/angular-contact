import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const isLoggedIn = localStorage.getItem('access_token');
      if (isLoggedIn) {
        return true;
      } else {
        return this.router.navigate(['/login']);
      }
    }
    return false;
  }
}
