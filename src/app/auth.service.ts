import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import {TimerService} from "./timer.service";

@Injectable()
export class AuthService {
    isLoggedIn = false;

    redirectUrl: string;
    loginUrl = "http://se.bmkw.org/api.php/users/email/?email="; //select * from :tabelle where :param = :body

    constructor(private http: HttpClient, private timerService: TimerService) {}

    login(email: string, pwd: string) {
      this.loginUrl += email + '&pwd='+pwd;
      this.isLoggedIn = true;
      try {
          this.http.get(this.loginUrl).subscribe(usr => this.timerService.user = usr);
      } catch (err) {
          console.log("login hätte nicht funktioniert!");
      }
    }

    logout(): void {
        this.isLoggedIn = false;
        this.timerService.user = null;
    }
}
