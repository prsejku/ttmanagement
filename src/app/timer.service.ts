import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TimerService {

  constructor(private http: HttpClient, private messageService: MessageService) { }

  startTimeUrl = "http://se.bmkw.org/api.php/";
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
      let time: string = input[0]+':'+input[1]+':'+input[2];
      console.log('received time: '+time);
    }
  }

  /*getStartingTime(): Observable<Date> {
    return this.http.get<Date>(this.startTimeUrl);
  }

  setStartTime(): Observable<boolean> {
    return this.http.put<boolean>(this.startTimeUrl, this.startTime == null ? new Date(Date.now()).toISOString() : this.startTime.toISOString());
  }*/

  startTime(): boolean {
    this.http.post(this.startTimeUrl, new Date(Date.now())).subscribe(usr => this.userJSON = usr);
    return !(this.userJSON == undefined || this.userJSON == null);
  }

  submitEndTime(endDate: Date): boolean {
    this.http.post<boolean>(this.startTimeUrl, endDate).subscribe(success => {return success});
    return false;
  }
}
