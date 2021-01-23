import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _AuthService:AuthService, private _router:Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let beforeAuth = ["/login", "/signup"];
      if (beforeAuth.includes(state.url)) {
        return new Promise((resolve, reject) => {
          this._AuthService.getUser().subscribe(user => {
            if (user) {
              resolve(false);
              this._router.navigate(['/']);
            } else {
              resolve(true) ;
            }
          })
        });
      }
      return new Promise((resolve, reject) => {
        this._AuthService.getUser().subscribe(user => {
          if (user) {
            resolve(true) ;
          } else {
            resolve(false);
            this._router.navigate(['/login']);
          }
        })
      });
  }

}
