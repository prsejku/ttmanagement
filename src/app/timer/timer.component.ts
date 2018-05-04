import { Component, OnInit } from '@angular/core';
import {TimerService} from "../timer.service";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

    hr: number;
    min: number;
    sek: number;
    displayedTime: string;
    running: boolean;
    loading: boolean;
    interv;

    constructor(private timerService: TimerService, private authService: AuthService) { }

    ngOnInit() {
        this.loading = true;
        this.timerService.getRunningTimeUser().subscribe(trackID => {
            if (trackID != 0) {
                this.timerService.getTimeTrack(trackID).subscribe(track => {
                    this.loading = false;
                    console.log(track);
                    //Das von JS akzeptierte Datumsformat trennt Datum und Zeit durch 'T',
                    //Oracle trennt aber mit Leerzeichen. --> Ersetzen, um Parse zu ermöglichen
                    let datestring = track.TASK_TIME[0].START_TIME.replace(" ", "T");
                    let time = new Date(datestring);
                    console.log(time.toLocaleTimeString());
                    let timeDif = new Date(Date.now() - time);
                    console.log(timeDif.toISOString());
                    this.hr = timeDif.getHours();
                    this.min = timeDif.getMinutes();
                    this.sek = timeDif.getSeconds();
                    this.displayedTime = timeDif
                        .toLocaleTimeString('de')
                        .slice(1, 8); //Abschneiden der führenden '0'
                    this.timer();
                });
            } else {
                this.loading = false;
                this.hr = 0;
                this.min = 0;
                this.sek = 1;
                this.displayedTime = "0:00:00";
                this.running = false;
            }
        });
    }

    timer(): void {
        this.running = true;
        this.interv = setInterval(_ => this.increment(), 1000);
    }

    increment(): void {
        let strSek, strMin;
        if (this.sek < 10) strSek = '0'+this.sek;
        else strSek = this.sek.toString();
        if (this.min < 10) strMin = '0'+this.min;
        else strMin = this.min.toString();
        this.displayedTime = this.hr+':'+strMin+':'+strSek;
        this.sek++;
        if (this.sek > 59) {
            this.sek = 0;
            this.min++;
            if (this.min > 59) {
                this.min = 0;
                this.hr++;
            }
        }
    }

    onSelect(): void {
        if (!this.running) {
            this.startDbTimer();
            this.timer();
        } else {
            this.stopDbTimer();
            this.running = false;
            clearInterval(this.interv);
        }
    }

    reset(): void {
        this.displayedTime = "0:00:00";
        this.hr = 0;
        this.min = 0;
        this.sek = 0;
    }

    startDbTimer() {
        this.timerService.startTime().subscribe(b => {
            console.log(b);
        });
    }

    stopDbTimer() {
        this.timerService.submitEndTime(new Date(Date.now())).subscribe(b => {
            console.log(b);
        });
    }
}
