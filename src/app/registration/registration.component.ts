import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {RegisterService} from '../register.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

    emailCtrl = new FormControl('', [Validators.required, Validators.email]);
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    pwd: string;
    pwdcheck: string;


  constructor(public registerService: RegisterService, public router: Router, private matDialogRef: MatDialogRef<RegistrationComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any)  { }

  ngOnInit() {
      const locStorVal = localStorage.getItem('tmg_register');
      if (locStorVal != null && locStorVal != undefined) {
          const credentials = locStorVal.split(' ');
          //this.authService.login(credentials[0], credentials[1]);
          this.firstname = credentials[0];
          this.lastname = credentials[1];
          this.username = credentials[2];
          this.email = credentials[3];
          this.pwd = credentials[4];
          this.pwdcheck = credentials[5];
          this.register();
      }
  }

  register() {
    this.registerService.register(this.firstname, this.lastname, this.username, this.email, this.pwd, this.pwdcheck);
  }

  registerClose() {
    this.matDialogRef.close();
  }

  getMailErrorMessage() {
    return this.emailCtrl.hasError('email') ? 'Not a valid email' : '';
  }

}
