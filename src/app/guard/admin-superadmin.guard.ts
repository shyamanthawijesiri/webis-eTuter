import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminSuperadminGuard implements CanActivate {
  constructor(private userService: UserService) { }

  canActivate(): boolean {
    if(this.userService.loggedIn() && (this.userService.loadToken().role ==='admin'  || this.userService.loadToken().role === 'superAdmin')) {
      return true;
    }else{
      return false;
    }

  }
}
