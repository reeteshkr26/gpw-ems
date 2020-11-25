import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { TokenStorageService } from '../user-management-system/service/token-storage.service';
import { UserService } from '../user-management-system/service/user.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerGuard implements CanActivate {
  roles:string[]=[];
  constructor(private loginService:UserService,private tokenService:TokenStorageService){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

      if(this.loginService.loggedIn()){
        this.roles=this.tokenService.getUser().roles;
        if(this.roles[0]==="CUSTOMER"){
          return of(true);
        }
      }
      else{
        return of(false);
      }
  }

}
