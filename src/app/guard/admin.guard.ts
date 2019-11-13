import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private userService: UserService) { }

  canActivate(): boolean{
    if(this.userService.loggedIn() && this.userService.loadToken().role ==='admin'){
      return true;
    }else {
      return false;
    }

  }

}
