import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from '../../helper/mustmatch.validator';
import { UserModel } from '../../model/user-model';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  model : UserModel
  registerForm: FormGroup;
  submitted = false;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  hide = true;
  mobnumPattern = "^[0-9]{10}$";
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: UserService) {
    this.model = new UserModel();
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(10)]],
      lastName: ['', [Validators.required, Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email,Validators.pattern(this.emailPattern)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      mobile: ['', [Validators.required, Validators.minLength(10),Validators.maxLength(10),Validators.pattern(this.mobnumPattern)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmpassword: ['', Validators.required]
  },  {
    validator: MustMatch('password', 'confirmpassword')}
    );
}

get f() { return this.registerForm.controls; }

onSubmit() {
  this.submitted = true;
    this.model.firstName = this.f.firstName.value,
    this.model.lastName = this.f.lastName.value,
    this.model.email = this.f.email.value,
    this.model.mobile = this.f.mobile.value,
    this.model.username = this.f.username.value,
    this.model.password = this.f.password.value

    this.authService.register(this.model).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigateByUrl('/login');
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }


onReset() {
  this.submitted = false;
  this.registerForm.reset();
}

}
