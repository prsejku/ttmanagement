import { Component, OnInit, Inject } from '@angular/core';
import {HttpService} from "../http.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(public timerService: HttpService) {}

  firstName: string;
  lastName: string;
  email: string;
  myGender: string;

  ngOnInit() {
  }

}
