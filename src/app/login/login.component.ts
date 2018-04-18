import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  emailCtrl = new FormControl('', [Validators.required, Validators.email]);
  email: string;
  pwd: string;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.email, this.pwd);
    this.email = undefined;
    this.pwd = undefined;
    this.authService.loginUrl = "http://se.bmkw.org/api.php/login/users/?email=";
  }

  logout() {
    this.authService.logout();
  }

  getMailErrorMessage() {
      return this.emailCtrl.hasError('email') ? 'Not a valid email' : '';
  }
}
