import { Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor( private router: Router) { }
  canActivate() {
    const isLoggedIn =localStorage.getItem("access_token")
    if (isLoggedIn) {
      return true;
    } else {
      return this.router.navigate(['/login']);
    }
  }

}
