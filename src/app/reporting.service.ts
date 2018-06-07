import { Injectable } from '@angular/core';
//import { Observable } from 'rxjs/Observable';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { User } from '../models/User';
import {TaskTime, TaskTimeJson} from '../models/TaskTime';

@Injectable()

/**
 * Service, der die für den Betrieb des Programms notwendige Kommunikation über HTTP
 * übernimmt. Alle Programmbereiche, die Daten aus dem Internet benötigen (ausßer Authentifizierung) nutzen diesen Service durch Injection.
 * Methoden können leider nicht übereinstimmend mit den Stored Procedures benannt werden, da JavaScript Method Overloading nur
 * eingeschränkt unterstützt.
 */
export class ReportingService {

    constructor(private http: HttpClient, private messageService: MessageService) { }

    apiUrl = 'http://se.bmkw.org/api.php';

    user: User;
    timeTrackId: number;
    timeTracks: TaskTime[];

    private log(message: string) {
        this.messageService.add('HttpService: ' + message);
    }

    /**
     *
     * @returns {Observable<TaskJson>}
     */
    getProjectsPerson(userId: number): Observable<string> {
        return this.http.get<string>(this.apiUrl + '/report_projectsPerson/report/?user_id=' + userId);
    }

    getProjectsDetailPerson(userId: number, projId: number): Observable<string> {
        return this.http.get<string>(this.apiUrl + '/report_projectsDetailPerson/report/?user_id=' + userId + '&project_id=' + projId);
    }

}
