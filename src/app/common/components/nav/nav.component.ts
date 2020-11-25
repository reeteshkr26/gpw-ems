import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/user-management-system/service/token-storage.service';
import { UserService } from 'src/app/user-management-system/service/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  header_variable=false;
  isLogin:boolean;
  isAdmin:boolean;
  isCustomer:boolean;
  roles:string[]=[];
  constructor(private router:Router,private loginService:UserService,private tokenStorage:TokenStorageService) {
    this.loginService.loginServiceEvent.subscribe((data)=>{
      this.toCheckUserRole();
    })
  }

  ngOnInit(): void {
    this.toCheckUserRole();
  }

  toCheckUserRole(){
    if(this.tokenStorage.getToken()){
      this.roles = this.tokenStorage.getUser().roles;
      console.log(this.roles);
      console.log("check user")
        this.isLogin=true;
        if(this.roles[0]==='ADMIN'){
          this.isAdmin=true;
          this.isCustomer=false;
        }
        if(this.roles[0]==='CUSTOMER'){
          this.isAdmin=false;
          this.isCustomer=true;
        }

    }
    else{
      this.isLogin=false;
    }
  }
  logoutUser(){
    this.tokenStorage.signOut();
    this.isLogin=false;
    this.isAdmin=false;
    this.isCustomer=false;
    alert("Logout sucess..!");
    this.router.navigateByUrl("/");

  }

  @HostListener("document:scroll")
  scrollFunction(){
    if(document.body.scrollTop>0 || document.documentElement.scrollTop>0){
      this.header_variable=true;
    }
    else{
      this.header_variable=false;
    }
  }
}
