import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { User } from "../models/User";
import { Task, TaskJson } from '../models/Task';

@Injectable()
export class TimerService {

  constructor(private http: HttpClient, private messageService: MessageService) { }

  timerUrl = "http://se.bmkw.org/apipost.php/TIMER";
  addProjectUrl = "http://se.bmkw.org/apipost.php/PROJEKT/ADD_PROJECT/";
  getProjectsUrl = "http://se.bmkw.org/api.php/projects/PROJECT_OVERVIEW";

  user: User;
  timeTrackId: number;

  private log(message: string) {
    this.messageService.add('TimerService: '+message);
  }

  enterTime(startTime: string, endTime: string) {
      let isoStartTime = TimerService.parseTime(startTime);
      let isoEndTime = TimerService.parseTime(endTime);
      if (isoStartTime == null || isoEndTime == null) this.log("invalid Time!");
      let today = new Date().toISOString().slice(0, 10) + " ";
      isoStartTime =  today + isoStartTime;
      isoEndTime = today + isoEndTime;
      console.log(isoStartTime + " - " + isoEndTime);
      let json = JSON.stringify(
          {start_time: isoStartTime, end_time: isoEndTime, proj_id: 0, pack_id: 0, task_id: 0, user_id: this.user.USER_ID}
          );
      console.log(json);
      this.http.post(this.timerUrl + "/START_TIMER/", json);
  }

  startTime(): Observable<boolean> {
    let offset = new Date().getTimezoneOffset();
    let time = new Date(Date.now()-offset*60000).toISOString();
    time = time.replace('T', ' ');
    time = "'"+time.slice(0,19)+"'";
    //let time = dtime.toISOString();
    console.log("zeit "+time);
    let json = JSON.stringify({"startdate": time, "projId": 1, "packId": 3, "taskId": 7, "userId": this.user.USER_ID});
    console.log(json);
    return this.http.post<boolean>(this.timerUrl+"/START_TIMER", json);
    //return true;
  }

  submitEndTime(endDate: Date): Observable<boolean> {
      let offset = new Date().getTimezoneOffset();
      let time = new Date(Date.now()-offset*60000).toISOString();
      time = time.replace('T', ' ');
      time = "'"+time.slice(0,19)+"'";
      //let time = dtime.toISOString();
      console.log("zeit "+time);
      let json = JSON.stringify({"userId": this.user.USER_ID, "enddate": time});
      console.log(json);
      return this.http.post<boolean>(this.timerUrl+"/END_TIMER/",json);
  }

    getRunningTimeUser(): Observable<number> {
        let json = JSON.stringify({"user_id": this.user.USER_ID});
        return this.http.post<number>(`${this.timerUrl}/RUNNING_TIME_USER/`, json);
        //return this.http.get("http://se.bmkw.org/api.php/timer/RUNNING_TIME_USER/?USER_ID="+this.user.USER_ID);
    }

  addProject(projectName: string, projectDesc: string): Observable<Object> {
    let name = "'"+projectName+"'";
    let desc = "'"+projectDesc+"'";
    let json = JSON.stringify({"name": name, "desc": desc, "user_id": this.user.USER_ID});
    console.log("POST: "+json);
    let res = this.http.post(this.addProjectUrl, json);
    this.log("Successfully added the Project");
    return res;
  }

  getProjects(): Observable<TaskJson> {
    return this.http.get<TaskJson>(this.getProjectsUrl);
  }

  static parseTime(input: string): string {
    let finalTime = "";
    let arr = input.split(":");
    if (arr.length >= 3) {
      if (arr.length > 3) return null;
      let sek = Number.parseInt(arr[2]);
      if (sek > 59 || sek < 0 || isNaN(sek)) return null;
      finalTime = ":" + sek;
    } else finalTime = ":00";
    if (arr.length >= 2) {
        let min = Number.parseInt(arr[1]);
        if (min < 0 || min > 59 || isNaN(min)) return null;
        finalTime = ":" + min + finalTime;
    } else finalTime = ":00" + finalTime;
    if (arr.length >= 1) {
      let hr = Number.parseInt(arr[0]);
      if (hr < 0 || hr > 23 || isNaN(hr)) return null;
      finalTime = hr + finalTime;
      if (hr < 10) finalTime = "0" + finalTime;
    } else return null;
    return finalTime;
  }

    getTimeTrack(t: number) {
        return this.http.get(`http://se.bmkw.org/api.php/task_time/TASK_TIME/?track_id=${t}`);
    }
}
