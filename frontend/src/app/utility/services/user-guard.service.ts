import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class UserGuardService implements CanActivate {
  constructor(private _router: Router, private toastr: ToastrService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    if (sessionStorage['currentLoggedUser']) {
      if (
        JSON.parse(sessionStorage.getItem('currentLoggedUser')).role == 'user'
      ) {
        return true;
      } else {
        this.toastr.info('Admin can not access this resource. Log in as User');
        this._router.navigate(['/login']);
        return false;
      }
    } else {
      this.toastr.info('Login to Continue');
      this._router.navigate(['/login']);
      return false;
    }
  }
}
