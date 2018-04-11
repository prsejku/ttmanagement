import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class TimerService {


  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  startTime: Date;

  private log(message: string) {
    this.messageService.add('TimerService: '+message);
  }

  enterTime(input: string[]) {
    if (input.length != 3 || input[1].length != 2 || input[2].length != 2) this.log('Please enter [H]H:MM:SS');
    let timeNum: number[] = new Array();
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
}
