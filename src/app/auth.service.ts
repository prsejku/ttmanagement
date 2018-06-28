import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {HttpService} from "./http.service";
import {Router} from "@angular/router";
import {User, UserJson} from "../models/User";
import {isNullOrUndefined} from 'util';
import {MessageService} from "./message.service";

@Injectable()
export class AuthService {
    isLoggedIn = false;
    progress = false;
    redirectUrl: string;
     //select * from :tabelle where :param = :body

    constructor(private http: HttpClient, private timerService: HttpService, public router: Router, public messageService: MessageService) {}

    getIsLoggedInStatus () {
        return this.isLoggedIn;
    };

    login(email: string, pwd: string, stay: boolean) {
        let loginUrl = `http://se.bmkw.org/api.php/login/users/?email=${email}&pwd=${pwd}`;
        this.progress = true;
        this.http.get<UserJson>(loginUrl).subscribe(response => {
            try {
                const user = response.users[0];
                this.progress = false;
                if (isNullOrUndefined(user)) {
                    return;
                }
                this.isLoggedIn = true;
                this.timerService.user = user;
                if (stay) {
                    localStorage.setItem('tmg_login', email + ' ' + pwd);
                }
                console.log(this.redirectUrl);
                this.router.navigate(['/timer-history']);
            } catch (e) {
                this.log("An error occured");
                this.progress = false;
            }
        }, e => {
            this.log("An error occured.");
            this.progress = false;
        });
    }


    logout(): void {
        this.isLoggedIn = false;
        localStorage.removeItem('tmg_login');
        this.timerService.user = null;
    }

    private log(m: string) {
        this.messageService.add('Authentication: ' + m);
    }
}
