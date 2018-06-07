import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {OpenService} from "../menu/open.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService, public openService: OpenService) { }

  ngOnInit() {
  }

}
