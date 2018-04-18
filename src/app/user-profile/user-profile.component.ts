import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  firstname = 'Max';
  lastname = 'Musterman';
  email = 'www.email.com';
  myGender = 'female';

  constructor() { }

  ngOnInit() {
  }

}
