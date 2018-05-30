import { Component, OnInit } from '@angular/core';
import { OpenService } from "./open.service";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(public openService: OpenService, public authService: AuthService) { }

  ngOnInit() {
  }

}
