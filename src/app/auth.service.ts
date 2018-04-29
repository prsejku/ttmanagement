import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import {TimerService} from "./timer.service";
import {Router} from "@angular/router";
import {User, UserJson} from "../models/User";

@Injectable()
export class AuthService {
    isLoggedIn = false;
    progress = false;
    redirectUrl: string;
    loginUrl = "http://se.bmkw.org/api.php/login/users/?email="; //select * from :tabelle where :param = :body

    constructor(private http: HttpClient, private timerService: TimerService, public router: Router) {}

    login(email: string, pwd: string, stay: boolean) {
        this.progress = true;
        this.loginUrl += email + '&pwd=' + pwd;
        this.http.get<UserJson>(this.loginUrl).subscribe(response => {
            let user = response.users[0];
            this.progress = false;
            if (user == null || user == undefined) return;
            this.isLoggedIn = true;
            this.timerService.user = user;
            if (stay) localStorage.setItem('tmg_login', email + ' '+pwd);
            this.router.navigate(['/dashboard']);
        });
    }


    logout(): void {
        this.isLoggedIn = false;
        localStorage.removeItem('tmg_login');
        this.timerService.user = null;
    }
}
