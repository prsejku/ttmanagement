import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service';
import {AuthService} from '../auth.service';
import { Task } from '../../models/task';
import {TaskService} from '../task.service';
import {retry} from 'rxjs/operators';

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
    curProj: Task;
    curWP: Task;
    curTask: Task;
    curTaskName: string;
    desc: string;

    constructor(private httpService: HttpService, public authService: AuthService, public taskService: TaskService) { }

    ngOnInit() {
        this.taskService.getProjects();
        this.loading = true;
        this.httpService.getRunningTimeUser().subscribe(trackID => {
            if (trackID != 0) {
                this.httpService.getTimeTrack(trackID).subscribe(track => {
                    this.loading = false;
                    console.log(track);
                    // Das von JS akzeptierte Datumsformat trennt Datum und Zeit durch 'T',
                    // Oracle trennt aber mit Leerzeichen. --> Ersetzen, um Parse zu ermöglichen
                    const datestring = track.TASK_TIME[0].START_TIME.replace(' ', 'T');
                    const time = new Date(datestring).getMilliseconds();
                    const timeDif = new Date(Date.now() - time);
                    console.log(timeDif.toISOString());
                    this.hr = timeDif.getHours();
                    this.min = timeDif.getMinutes();
                    this.sek = timeDif.getSeconds();
                    this.displayedTime = timeDif
                        .toLocaleTimeString('de')
                        .slice(1, 8); // Abschneiden der führenden '0'
                    this.timer();
                });
            } else {
                this.loading = false;
                this.reset();
                this.running = false;
            }
        });
    }

    timer(): void {
        this.running = true;
        this.interv = setInterval(_ => this.increment(), 1000);
    }

    /**
     * Inkrementiert die dargestellte Zeit ('displayedTime') um eine Sekunde und stellt dabei sicher,
     * dass der String eine valide Zeit bleibt (Sekunden und Minuten unter 60).
     */
    increment(): void {
        let strSek, strMin;
        // Hinzufügen einer führenden '0', wenn Sekunden und Minuten unter 10 sind
        if (this.sek < 10) { strSek = '0' + this.sek; }
        else { strSek = this.sek.toString(); }
        if (this.min < 10) { strMin = '0' + this.min; }
        else { strMin = this.min.toString(); }
        this.displayedTime = this.hr + ':' + strMin + ':' + strSek;
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

    /**
     * Startet oder stoppt den Timer (aus Template heraus aufgerufen)
     */
    playButton(): void {
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
        this.displayedTime = '0:00:00';
        this.hr = 0;
        this.min = 0;
        this.sek = 0;
    }

    /**
     * Handler für die HTTP-Response aus dem HTTP Service. Bei erfolgreichem Datenbank-Eintrag wird der
     * lokale Timer gestartet.
     */
    startDbTimer() {
        this.httpService.startTime(this.curTask.TASK_NR, this.desc).subscribe(b => {
            console.log(b);
        }, err => {
            this.running = false;
            clearInterval(this.interv);
            this.reset();
        });
    }

    /**
     * Handler für die HTTP-Response aus dem HTTP Service. Bei erfolgreichem Datenbank-Eintrag wird der
     * lokale Timer gestoppt.
     */
    stopDbTimer() {
        this.httpService.submitEndTime(new Date(Date.now())).subscribe(b => {
            console.log(b);
        }, _ => {this.running = true; this.timer(); });
    }
}
