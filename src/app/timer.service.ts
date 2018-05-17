import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { User } from "../models/User";
import {ProjectJson, Task, TaskJson, WorkPackJson} from '../models/Task';
import {TaskTimeJson} from '../models/TaskTime';

@Injectable()
export class TimerService {

  constructor(private http: HttpClient, private messageService: MessageService) { }

  url = "http://se.bmkw.org";
  apiUrl = `${this.url}/api.php`;
  apipostUrl = `${this.url}/apipost.php`;
  getProjectsUrl = "http://se.bmkw.org/api.php/projects";

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
      this.http.post(`${this.apipostUrl}/TIMER/START_TIMER`, json);
  }

  startTime(PROJ_ID: number, PACK_ID: number, TASK_ID: number): Observable<boolean> {
    let offset = new Date().getTimezoneOffset();
    let time = new Date(Date.now()-offset*60000).toISOString();
    time = time.replace('T', ' ');
    time = "'"+time.slice(0,19)+"'";
    //let time = dtime.toISOString();
    console.log("zeit "+time);
    let json = JSON.stringify({"startdate": time, "projId": PROJ_ID, "packId": PACK_ID, "taskId": TASK_ID, "userId": this.user.USER_ID});
    console.log(json);
    return this.http.post<boolean>(`${this.apipostUrl}/TIMER/START_TIMER`, json);
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
      return this.http.post<boolean>(`${this.apipostUrl}/TIMER/END_TIMER`,json);
  }

    getRunningTimeUser(): Observable<number> {
        let json = JSON.stringify({"user_id": this.user.USER_ID});
        return this.http.post<number>(`${this.apipostUrl}/TIMER/RUNNING_TIME_USER`, json);
        //return this.http.get("http://se.bmkw.org/api.php/timer/RUNNING_TIME_USER/?USER_ID="+this.user.USER_ID);
    }

  addProject(projectName: string, projectDesc: string): Observable<Object> {
    let name = "'"+projectName+"'";
    let desc = "'"+projectDesc+"'";
    let json = JSON.stringify({"name": name, "desc": desc, "user_id": this.user.USER_ID});
    console.log("POST: "+json);
    let res = this.http.post(`${this.apipostUrl}/PROJEKT/ADD_PROJECT`, json);
    this.log("Successfully added the Project");
    return res;
  }

    addWorkPack(projectName: string, projectDesc: string, project: number): Observable<Object> {
        let name = "'"+projectName+"'";
        let desc = "'"+projectDesc+"'";
        let json = JSON.stringify({name: name, desc: desc, proj_id: project});
        console.log("POST: "+json);
        return this.http.post(`${this.apipostUrl}/WORKING_PACKAGE/ADD_WORKPACK`, json);
    }

    addTask(name: string, desc: string, workPack: number): Observable<Object> {
        name = "'"+name+"'";
        desc = "'"+desc+"'";
        let json = JSON.stringify({name: name, desc: desc, work_pack: workPack});
        console.log("POST: "+json);
        return this.http.post(`${this.apipostUrl}/ACTIVITY/ADD_TASK`, json);
    }

  getProjects(): Observable<ProjectJson> {
    return this.http.get<ProjectJson>(`${this.getProjectsUrl}/PROJECT_OVERVIEW`);
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

    getTimeTrack(t: number): Observable<TaskTimeJson> {
        return this.http.get<TaskTimeJson>(`http://se.bmkw.org/api.php/task_time/TASK_TIME/?track_id=${t}`);
    }

    getWorkPacks(): Observable<WorkPackJson> {
        return this.http.get<WorkPackJson>("http://se.bmkw.org/api.php/projects/WORKING_PACKAGE_OVERVIEW")
    }

    getTasks(): Observable<TaskJson> {
        return this.http.get<TaskJson>('http://se.bmkw.org/api.php/projects/TASK_OVERVIEW');
    }
}
