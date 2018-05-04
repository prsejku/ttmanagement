import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {FormControl, Validators} from '@angular/forms';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  emailCtrl = new FormControl('', [Validators.required, Validators.email]);
  email: string;
  pwd: string;
  checked: boolean;

  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit() {
    if (this.authService.isLoggedIn) return;
    let locStorVal = localStorage.getItem('tmg_login');
    if (locStorVal != null && locStorVal != undefined) {
      let credentials = locStorVal.split(' ');
      //this.authService.login(credentials[0], credentials[1]);
      this.email = credentials[0];
      this.pwd = credentials[1];
      this.login();
    }
  }

  login() {
    this.authService.login(this.email, this.pwd, this.checked);
    this.email = undefined;
    this.pwd = undefined;
  }

  logout() {
    this.authService.logout();
  }

  getMailErrorMessage() {
      return this.emailCtrl.hasError('email') ? 'Not a valid email' : '';
  }
}
