import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {HttpService} from './http.service';
import {Router} from '@angular/router';
import {User, UserJson} from '../models/User';

//import 'rxjs/add/observable/of';
//import 'rxjs/add/operator/do';
//import 'rxjs/add/operator/delay';
import {Observable} from 'rxjs/Observable';
//import {TimerService} from "./timer.service";

import {MessageService} from './message.service';

@Injectable()
export class RegisterService {
    progress = false;
    redirectUrl: string;
    userCreated: boolean;
    //select * from :tabelle where :param = :body

    constructor(private http: HttpClient, public router: Router, private messageService: MessageService) {}

    register(firstname: string, lastname: string, username: string, email: string, pwd: string, pwdcheck: string) {
        firstname = '\'' + firstname + '\'';
        lastname = '\'' + lastname + '\'';
        username = '\'' + username + '\'';
        email = '\'' + email + '\'';
        pwd = '\'' + pwd + '\'';
        const apipostUrl = `http://se.bmkw.org/apipost.php`;
        this.progress = true;
        const json = JSON.stringify({username: username, firstname: firstname, lastname: lastname, password: pwd,
            email: email, persontype: '0'});
        console.log('POST: ' + json);
        return this.http.post(`${apipostUrl}/PERSON/ADD_USER`, json).subscribe(data => {
            console.log('Ergebnis: ' + data);
            if (data === 1) {
                this.userCreated = true;
            }
        });
        //this.log("Successfully added the Project");
        //return res;
        //this.router.navigate(['/login']);
    }

    private log(message: string) {
        this.messageService.add('RegisterService: ' + message);
    }


}
