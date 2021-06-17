import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from './../services/user.service';
@Injectable({
  providedIn: 'root'
})
export class ProfileAuthGuard implements CanActivate {
  constructor(private UserService:UserService, private Router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.UserService.getUserToken()){
      return true;
    }
    else{
      this.Router.navigate(["/index"])
      return false;
    }

  }



}
