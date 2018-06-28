import { TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import {TaskService} from "../task.service";
import {ReportingService} from "../reporting.service";
import {HttpService} from "../http.service";
import {} from 'jasmine';

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let reportingServiceSpy: jasmine.SpyObj<ReportingService>;
    let taskServiceSpy: jasmine.SpyObj<TaskService>;
    let httpServiceSpy: jasmine.SpyObj<HttpService>;


    beforeEach(() => {
        const reportingSpy = jasmine.createSpyObj('ReportingService', ['getProjectsPerson']);
        const taskSpy = jasmine.createSpyObj('TaskService', ['getWorkPacks']);
        const httpSpy = jasmine.createSpyObj('HttpService', ['getTimeTrack']);
        TestBed.configureTestingModule({
            providers: [
                DashboardComponent,
                {provide: ReportingService, useValue: reportingSpy},
                {provide: TaskService, useValue: taskSpy},
                {provide: HttpService, useValue: httpSpy}
            ]});
        component = TestBed.get(DashboardComponent);

    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
