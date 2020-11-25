import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserModel } from '../model/user-model';
import { TokenStorageService } from './token-storage.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class UserService {

  loginServiceEvent = new Subject<string>();
  baseUrl:string;
  constructor(private http: HttpClient,private tokenService:TokenStorageService) {
    this.baseUrl=`${environment.baseMWUrl}/user-service/auth`
   }

  login(user : UserModel): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, {
      username: user.username,
      password: user.password
    }, httpOptions);
  }

  register(user : UserModel): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
      username: user.username,
      password: user.password
    }, httpOptions);
  }

  loggedIn():boolean{
    return !!this.tokenService.getUser();
  }
}
