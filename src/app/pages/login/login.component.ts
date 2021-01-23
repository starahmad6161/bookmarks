import { AuthService } from './../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { DbService } from 'src/app/core/services/db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  faUser = faUser;
  faEnvelope = faEnvelope;
  faLock = faLock;
  loginForm:FormGroup;
  signupForm:FormGroup;

  loading:boolean = false;
  errMsg:string = '';
  loginChoosed:boolean = true;


  constructor(private _AuthService:AuthService, private _DbService:DbService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
    this.signupForm = new FormGroup({
      signupUsername: new FormControl(null, [Validators.required]),
      signupEmail: new FormControl(null, [Validators.required, Validators.email]),
      signupPassword: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  get email() {
    return this.loginForm.get("email");
  }
  get password() {
    return this.loginForm.get("password");
  }

  //For Signup
  get signupUsername() {
    return this.signupForm.get("signupUsername");
  }
  get signupEmail() {
    return this.signupForm.get("signupEmail");
  }
  get signupPassword() {
    return this.signupForm.get("signupPassword");
  }

  login() {
    if (this.loginForm.valid) {
      this.loading = true;
      this._AuthService.logIn(this.email.value, this.password.value).then(() => {
        this.loading = false;
      }).catch(err => {
        this.errMsg = err.message;
        this.loading = false;
      });
    }
  }
  signup() {
    if (this.signupForm.valid) {
      this.loading = true;
      this._AuthService.signup(this.signupEmail.value, this.signupPassword.value).then((user) => {
        this._DbService.createNewUser(user.user.uid, this.signupUsername.value).then(()=> {
          this.loading = false;
        }).catch(err => this.loading = false);
      }).catch(err => this.loading = false);
    }
  }

}
