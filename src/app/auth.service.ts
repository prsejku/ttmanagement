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
    loginUrl = "http://se.bmkw.org/api.php/login/users/?email="; //select * from :tabelle where :param = :body

    constructor(private http: HttpClient, private timerService: TimerService) {}

    login(email: string, pwd: string) {
      this.loginUrl += email + '&pwd='+pwd;
      console.log('req: '+this.loginUrl);
      try {
          this.http.get(this.loginUrl).subscribe(usr => this.timerService.userJSON = usr);
          setTimeout(() => {
              this.timerService.user = this.timerService.userJSON.users[0];
              console.log(this.timerService.user);
              this.isLoggedIn = this.timerService.user != null&&this.timerService.user != undefined;
          }, 1000);

      } catch (err) {
          console.log("login hätte nicht funktioniert!");
      }
    }

    logout(): void {
        this.isLoggedIn = false;
        this.timerService.user = null;
        this.timerService.userJSON = null;
    }
}
