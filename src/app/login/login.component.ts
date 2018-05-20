import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../auth.service';
import {FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {RegistrationComponent} from '../registration/registration.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  entryComponents: [RegistrationComponent],
})
export class LoginComponent implements OnInit {

  emailCtrl = new FormControl('', [Validators.required, Validators.email]);
  email: string;
  pwd: string;
  checked: boolean;

  constructor(public authService: AuthService, public router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    if (this.authService.isLoggedIn) { return; }
    const locStorVal = localStorage.getItem('tmg_login');
    if (locStorVal != null && locStorVal != undefined) {
      const credentials = locStorVal.split(' ');
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

  openDialog() {
    this.dialog.open(RegistrationComponent, {
      width: '250px',
      //data: {name: 'angular lessons' }
    });
  }


}
