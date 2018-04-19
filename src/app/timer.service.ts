import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import {RequestOptions} from "@angular/http";

@Injectable()
export class TimerService {

  constructor(private http: HttpClient, private messageService: MessageService) { }

  timerUrl = "http://se.bmkw.org/apipost.php/TIMER/";
  addProjectUrl = "http://se.bmkw.org/apipost.php/ADD_PROJECT/";
  getProjectsUrl = "http://se.bmkw.org/api.php/projects/PROJECT_OVERVIEW";

  userJSON; //Angemeldeter User wird hier gespeichert
  user;
  timeTrackId: number;

  private log(message: string) {
    this.messageService.add('TimerService: '+message);
  }

  enterTime(input: string[]) {
    if (input.length != 3 || input[1].length != 2 || input[2].length != 2) this.log('Please enter [H]H:MM:SS');
    let timeNum: number[] = [];
    for (let i=0; i<input.length; i++) {
      timeNum.push(+input[i]);
    }
    if (isNaN(timeNum[0]) || isNaN(timeNum[1]) || isNaN(timeNum[2])) this.log('Non-numeric Characters found');
    else if (timeNum[0] < 0 || timeNum[1] < 0 || timeNum[2] < 0 || timeNum[1] > 59 || timeNum[2] > 59) this.log('Time is not valid');
    else {
      let time: string = input[0]+':'+input[1]+':'+input[2];//task 1 ist projekt, task 3 ist arbeitspaket, task 7 ist task
      console.log('received time: '+time);
    }
  }

  startTime(): boolean {
    let offset = new Date().getTimezoneOffset();
    let time = new Date(Date.now()-offset*60000).toISOString();
    time = time.replace('T', ' ');
    time = "'"+time.slice(0,19)+"'";
    //let time = dtime.toISOString();
    console.log("zeit "+time);
    let json = JSON.stringify({"startdate": time, "projId": 1, "packId": 3, "taskId": 7, "userId": this.user.USER_ID});
    console.log(json);
    this.http.post(this.timerUrl+"START_TIMER/",json).subscribe(usr => this.userJSON = usr);
    return !(this.userJSON == undefined || this.userJSON == null);
  }

  submitEndTime(endDate: Date): boolean {
      let offset = new Date().getTimezoneOffset();
      let time = new Date(Date.now()-offset*60000).toISOString();
      time = time.replace('T', ' ');
      time = "'"+time.slice(0,19)+"'";
      //let time = dtime.toISOString();
      console.log("zeit "+time);
      let json = JSON.stringify({"userId": this.user.USER_ID, "enddate": time});
      console.log(json);
      this.http.post(this.timerUrl+"END_TIMER/",json).subscribe(usr => this.userJSON = usr);
      return !(this.userJSON == undefined || this.userJSON == null);
  }

  addProject(projectName: string, projectDesc: string): boolean {
    let name = "'"+projectName+"'";
    let desc = "'"+projectDesc+"'";
    let json = JSON.stringify({"name": name, "desc": desc, "user_id": this.user.USER_ID});
    console.log("POST: "+json);
    this.http.post(this.addProjectUrl, json).subscribe(b => {return b;});
    return false;
  }

  getProjects() {
    return this.http.get<any[]>(this.getProjectsUrl);
  }

}
