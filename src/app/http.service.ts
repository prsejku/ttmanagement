import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import {ProjectJson, Task, TaskJson, WorkPackJson} from '../models/task';
import {TaskTime, TaskTimeJson} from '../models/TaskTime';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()

/**
 * Service, der die für den Betrieb des Programms notwendige Kommunikation über HTTP
 * übernimmt. Alle Programmbereiche, die Daten aus dem Internet benötigen (ausßer Authentifizierung) nutzen diesen Service durch Injection.
 * Methoden können leider nicht übereinstimmend mit den Stored Procedures benannt werden, da JavaScript Method Overloading nur
 * eingeschränkt unterstützt.
 */
export class HttpService {

  constructor(private http: HttpClient,
              private messageService: MessageService) { }

  url = 'http://se.bmkw.org';
  apiUrl = `${this.url}/api.php`;
  apipostUrl = `${this.url}/apipost.php`;
  getProjectsUrl = 'http://se.bmkw.org/api.php/projects';

  user: User;
  timeTrackId: number;
  timeTracks = [];

  static parseSeconds(arg: number): string {
    let sec = arg % 60;
    arg -= sec;
    arg = arg / 60;
    let min = '' + arg % 60;
    arg -= arg % 60;
    arg = arg / 60;
    if (min.length == 1) { min = '0' + min; }
    const hr = '' + arg;
    sec = sec % 60;
    return hr + ':' + min + ':' + (sec < 10 ? '0' + sec : '' + sec);
  }

  private log(message: string) {
    this.messageService.add(message);
  }

    /**
     * Ruft via JSON Remote Procedure Call die Oracle-Prozedur "START_TIME(DATE, DATE, INTEGER, INTEGER)" auf.
     * @param selectedDate
     * @param {string} startTime
     * @param {string} endTime
     * @param desc
     * @param {number} TASK_ID
     */
  enterTime(selectedDate: Date, startTime: string, endTime: string, desc: string, TASK_ID: number) {
        let isoStartTime = HttpService.parseTime(startTime);
        let isoEndTime = HttpService.parseTime(endTime);
        if (isoStartTime == null || isoEndTime == null) { this.log('invalid Time!'); }
        const day = selectedDate.toISOString().slice(0, 10) + ' ';
        isoStartTime =  '\'' + day + isoStartTime + '\'';
        isoEndTime = '\'' + day + isoEndTime + '\'';
        const json = JSON.stringify({
            start_time: isoStartTime,
            end_time: isoEndTime,
            desc: '\'' + desc + '\'',
            task_id: TASK_ID,
            user_id: this.user.USER_ID}
          );
        console.log(json);
        return this.http.post(`${this.apipostUrl}/TIMER/START_TIMER`, json);
    }

    /**
     * Ruft via JSON RPC die Oracle-Prozedur "START_TIME(DATE, [VARCHAR2,] INTEGER, INTEGER)" auf.
     * @param {number} TASK_ID
     * @param {string} desc
     * @returns {Observable<boolean>}
     */
    startTime(TASK_ID: number, desc: string): Observable<boolean> {
        const offset = new Date().getTimezoneOffset();
        let time = new Date(Date.now() - offset * 60000).toISOString();
        time = time.replace('T', ' ');
        time = '\'' + time.slice(0, 19) + '\'';
        console.log('zeit ' + time);
        let json;
        if (desc != undefined && desc != '') {
            const descNew = `'${desc}'`;
            json = JSON.stringify({
                startdate: time,
                desc: descNew,
                taskId: TASK_ID,
                userId: this.user.USER_ID
            });
            return this.http.post<boolean>(`${this.apipostUrl}/TIMER/START_TIMER_DESC`, json);
        } else {
            json = JSON.stringify ({
                startdate: time,
                taskId: TASK_ID,
                userId: this.user.USER_ID
            });
        }
        console.log(json);
        return this.http.post<boolean>(`${this.apipostUrl}/TIMER/START_TIMER`, json);
    }

    /**
     * Ruft via JSON RPC die Oracle-Prozedur "END_TIMER(DATE, INTEGER)" auf.
     * @param {Date} endDate
     * @returns {Observable<boolean>}
     */
    submitEndTime(endDate: Date): Observable<boolean> {
        const offset = new Date().getTimezoneOffset();
        let time = new Date(Date.now() - offset * 60000).toISOString();
        time = time.replace('T', ' ');
        time = '\'' + time.slice(0, 19) + '\'';
        console.log('zeit ' + time);
        const json = JSON.stringify({userId: this.user.USER_ID, enddate: time});
        console.log(json);
        return this.http.post<boolean>(`${this.apipostUrl}/TIMER/END_TIMER`, json);
    }

    /**
     * Gibt, falls vorhanden, die ID der laufenden Zeit des angemeldeten Users zurück, indem via JSON RPC die Prozedur
     * "RUNNING_TIME_USER(INTEGER)" aufgerufen wird.
     * @returns {Observable<number>}
     */
    getRunningTimeUser(): Observable<number> {
        const json = JSON.stringify({'user_id': this.user.USER_ID});
        return this.http.post<number>(`${this.apipostUrl}/TIMER/RUNNING_TIME_USER`, json);
    }

    getTimeTracks() {
        this.getProjects().subscribe(p => {
            const projects = p.PROJECT_OVERVIEW;
            this.getWorkPacks().subscribe(w => {
                const workPacks = w.WORKING_PACKAGE_OVERVIEW;
                this.getTasks().subscribe(t => {
                    const tasks = t.TASK_OVERVIEW;
                    this.http.get<TaskTimeJson>(`${this.apiUrl}/task_time_user/TASK_TIME/?user_id=${this.user.USER_ID}`).subscribe(tt => {
                        const tracksPlus = [];
                        for (const entry of tt.TASK_TIME) {
                            let taskName: string;
                            let wpName: string;
                            let projName: string;
                            for (const task of tasks) {
                                if (entry.TASK_ID == task.TASK_NR) {
                                    taskName = task.NAME;
                                    break;
                                }
                            }
                            for (const wp of workPacks) {
                                if (entry.PACK_ID == wp.TASK_NR) {
                                    wpName = wp.NAME;
                                    break;
                                }
                            }
                            for (const proj of projects) {
                                if (entry.PROJ_ID == proj.TASK_NR) {
                                    projName = proj.NAME;
                                    break;
                                }
                            }
                            const startDate = new Date(entry.START_TIME);
                            const endDate = new Date(entry.END_TIME);
                            const startTime = startDate.toLocaleTimeString();
                            const endTime = endDate.toLocaleTimeString();
                            const duration = HttpService.parseSeconds(entry.DIFF_IN_SEC);
                            tracksPlus.push({
                                TRACK_ID: entry.TRACK_ID,
                                DATE: new Date(entry.START_TIME).toLocaleDateString(),
                                START_TIME: startTime,
                                END_TIME: endTime,
                                DURATION: duration,
                                DESCRIPTION: entry.DESCRIPTION,
                                PROJECT_NAME: projName,
                                WORK_PACK_NAME: wpName,
                                TASK_NAME: taskName
                            });
                        }
                        this.timeTracks = tracksPlus;
                    });
                });
            });
        });
    }

    deleteTimeTrack(id: number): Observable<boolean> {
        return this.http.post<boolean>(`${this.apipostUrl}/TIMER/TIME_DELETE`, `{"TRACK_ID":"${id}"}`);
    }

    /**
     * Führt via JSON RPC die Oracle-Prozedur "ADD_PROJECT(VARCHAR2, VARCHAR2, INTEGER) aus und fügt der Datenbank ein Projekt hinzu.
     * @param {string} projectName
     * @param {string} projectDesc
     * @returns {Observable<Object>}
     */
    addProject(projectName: string, projectDesc: string): Observable<Object> {
        const name = '\'' + projectName + '\'';
        const desc = '\'' + projectDesc + '\'';
        const json = JSON.stringify({name: name, desc: desc, user_id: this.user.USER_ID});
        console.log('POST: ' + json);
        const res = this.http.post(`${this.apipostUrl}/PROJEKT/ADD_PROJECT`, json);
        this.log('Successfully added the Project');
        return res;
    }

    updateUser(user: User): Observable<boolean> {
        const json = JSON.stringify({
            USER_ID: user.USER_ID,
            USERNAME: '\'' + user.USERNAME + '\'',
            FIRSTNAME: '\'' + user.FIRSTNAME + '\'',
            LASTNAME: '\'' + user.LASTNAME + '\'',
            PW: '\'' + user.PW + '\'',
            MAIL: '\'' + user.MAIL + '\'',
            PERSON_TYPE: '\'' + user.PERSON_TYPE + '\''});
        return this.http.post<boolean>(`${this.apipostUrl}/PERSON/UPDATE_USER`, json);
    }

    /**
     * Führt via JSON RPC die Oracle-Prozedur "ADD_WORKPACK(VARCHAR2, VARCHAR2, INTEGER) aus und fügt der Datenbank ein Arbeitspaket hinzu.
     * @param {string} workPackName
     * @param {string} workPackDesc
     * @param {number} project
     * @returns {Observable<Object>}
     */
    addWorkPack(workPackName: string, workPackDesc: string, project: number): Observable<Object> {
        const name = '\'' + workPackName + '\'';
        const desc = '\'' + workPackDesc + '\'';
        const json = JSON.stringify({name: name, desc: desc, proj_id: project});
        console.log('POST: ' + json);
        return this.http.post(`${this.apipostUrl}/WORKING_PACKAGE/ADD_WORKPACK`, json);
    }

    /**
     * Führt via JSON RPC die Oracle-Prozedur "ADD_TASK(VARCHAR2, VARCHAR2, INTEGER) aus und fügt der Datenbank eine Aufgabe hinzu.
     * @param {string} name
     * @param {string} desc
     * @param {number} workPack
     * @returns {Observable<Object>}
     */
    addTask(name: string, desc: string, workPack: number): Observable<Object> {
        name = '\'' + name + '\'';
        desc = '\'' + desc + '\'';
        const json = JSON.stringify({name: name, desc: desc, work_pack: workPack});
        console.log('POST: ' + json);
        return this.http.post(`${this.apipostUrl}/ACTIVITY/ADD_TASK`, json);
    }

    updateTask(task: Task): Observable<boolean> {
        const numStatus = '\'' + (task.STATUS ? 1 : 0) + '\'';
        const json = JSON.stringify({
          projektNr: `${task.TASK_NR}`,
          name: `'${task.NAME}'`,
          desc: `'${task.DESCRIPTION}'`,
        });
        if (task.TASK_TYPE == 1) {
            this.http.post(`${this.apipostUrl}/PROJEKT/SET_STATUS`, `{"id: "${task.TASK_NR}", "status": "${numStatus}"}`);
            return this.http.post<boolean>(`${this.apipostUrl}/PROJEKT/UPDATE_PROJ_NAME_DESC`, json);
        } else if (task.TASK_TYPE == 0) {
            this.http.post(`${this.apipostUrl}/ACTIVITY/SET_STATUS`, `{"id: "${task.TASK_NR}", "status": "${numStatus}"}`);
            return this.http.post<boolean>(`${this.apipostUrl}/ACTIVITY/UPDATE_PROJ_NAME_DESC`, json);
        } else if (task.TASK_TYPE == 2) {
            this.http.post(`${this.apipostUrl}/WORKING_PACKAGE/SET_STATUS`, `{id: ${task.TASK_NR}, status: ${numStatus}}`);
            return this.http.post<boolean>(`${this.apipostUrl}/WORKING_PACKAGE/UPDATE_PROJ_NAME_DESC`, json);
        }
    }

    archiveTask(taskNr: number, taskType): Observable<boolean> {
        console.log('TaskType: ' + taskType);
        const json = JSON.stringify({TASK_NR: taskNr});
        let pack = '';
        switch (Number.parseInt(taskType)) {
            case 0: pack = 'ACTIVITY'; break;
            case 1: pack = 'PROJEKT'; break;
            case 2: pack = 'WORKING_PACKAGE'; break;
        }
        console.log('Pack: ' + pack + ' JSON: ' + json);
        return this.http.post<boolean>(`${this.apipostUrl}/${pack}/ARCHIVE_PROJ`, json);
    }

    getProjects(): Observable<ProjectJson> {
        return this.http.get<ProjectJson>(`${this.getProjectsUrl}/PROJECT_OVERVIEW`);
    }

    /**
     * Parst einen String der Form "[H]H", "[H]H:[M]M" oder "[H]H:[M]M:[S]S" zu der Form "HH:MI:SS" und prüft dabei dessen Gültigkeit
     * @param {string} input
     * @returns {string} oder null, wenn input-Zeit ungültig
     */
    static parseTime(input: string): string {
        let finalTime = '';
        const arr = input.split(':');
        // Prüfung, ob Sekunden angegeben wurden
        if (arr.length >= 3) {
            if (arr.length > 3) { return null; }
            const sek = Number.parseInt(arr[2]);
            if (sek > 59 || sek < 0 || isNaN(sek)) { return null; }
            finalTime = ':' + sek;
        } else { finalTime = ':00'; }
        // Prüfung, ob Minuten angegeben wurden
        if (arr.length >= 2) {
            const min = Number.parseInt(arr[1]);
            if (min < 0 || min > 59 || isNaN(min)) { return null; }
            finalTime = ':' + min + finalTime;
        } else { finalTime = ':00' + finalTime; }
            if (arr.length >= 1) {
                const hr = Number.parseInt(arr[0]);
                if (hr < 0 || hr > 23 || isNaN(hr)) { return null; }
                finalTime = hr + finalTime;
                if (hr < 10) { finalTime = '0' + finalTime; }
            } else { return null; }
        return finalTime;
    }

    getTimeTrack(t: number): Observable<TaskTimeJson> {
        return this.http.get<TaskTimeJson>(`http://se.bmkw.org/api.php/task_time/TASK_TIME/?track_id=${t}`);
    }

    getWorkPacks(): Observable<WorkPackJson> {
        return this.http.get<WorkPackJson>('http://se.bmkw.org/api.php/projects/WORKING_PACKAGE_OVERVIEW');
    }

    getTasks(): Observable<TaskJson> {
        return this.http.get<TaskJson>('http://se.bmkw.org/api.php/projects/TASK_OVERVIEW');
    }

    /*getSubProjects(): Observable<TaskJson> {
        return this.http.get<TaskJson>(`http://se.bmkw.org/api.php/projects/SUB_PROJECT_OVERVIEW`);
    }*/
}
