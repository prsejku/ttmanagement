import { Component, OnInit, Inject } from '@angular/core';
import {HttpService} from "../http.service";
import {User} from "../../models/User";
import {MatDialog} from "@angular/material";
import {SaveDialogComponent} from "../save-dialog/save-dialog.component"
import {MessageService} from "../message.service";


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(public httpService: HttpService, public dialog: MatDialog, private messageService: MessageService) {}

  updatedUser: User;

  ngOnInit() {
    this.updatedUser = new User();
      this.updatedUser.USER_ID = this.httpService.user.USER_ID;
      this.updatedUser.USERNAME = this.httpService.user.USERNAME;
      this.updatedUser.FIRSTNAME = this.httpService.user.FIRSTNAME;
      this.updatedUser.LASTNAME = this.httpService.user.LASTNAME;
      this.updatedUser.PW = this.httpService.user.PW;
      this.updatedUser.PERSON_TYPE = this.httpService.user.PERSON_TYPE;
      this.updatedUser.MAIL = this.httpService.user.MAIL;
  }

  openSaveDialog() {
    const dialogRef = this.dialog.open(SaveDialogComponent);

    dialogRef.afterClosed().subscribe(x => {
      if (x) { this.httpService.updateUser(this.updatedUser).subscribe(b => {
        if (b) { this.messageService.add("User updated successfully!"); }
      }); }
    });
  }

}
