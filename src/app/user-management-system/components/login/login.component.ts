import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from '../../model/user-model';
import { TokenStorageService } from '../../service/token-storage.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  model : UserModel
  submitted = false;
  isLoggedIn = false;
  isLoginFailed = false;
  btnClick:boolean;
  hide = true;
  roles: string[] = [];
  errorMessage = '';

  constructor(private formBuilder: FormBuilder, private authService: UserService, private tokenStorage: TokenStorageService,private router:Router) {
    this.model = new UserModel();
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
  });

  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.btnClick=true;
    this.submitted = true;
    this.model.username = this.f.username.value,
    this.model.password = this.f.password.value


    this.authService.login(this.model).subscribe(
      data => {
        this.btnClick=false;
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        //this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        console.log(this.roles);
        setTimeout(()=>this.isLoggedIn=false,4000);
        this.authService.loginServiceEvent.next('success');

        this.router.navigateByUrl("/");
      },
      err => {
        this.btnClick=false;
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

}
