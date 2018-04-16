import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
//import {FormControl, FormGroupDirective, ngForm } from '@angular/forms';
import {ErrorStateMatcher} from "@angular/material";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorStateMatcher: ErrorStateMatcher;

  constructor(public authService: AuthService) { }

  ngOnInit() {
      /*this.errorStateMatcher = {
          isErrorState(control: FormControl | null, form: FormGroupDirective | ngForm | null): boolean {
              const isSubmitted = form && form.submitted;
              return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
          }
      };*/
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

}
