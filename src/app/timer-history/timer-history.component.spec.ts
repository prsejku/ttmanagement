import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { TimerHistoryComponent } from './timer-history.component';
import {HttpService} from "../http.service";
import {TaskService} from "../task.service";
import {Observable} from "rxjs/Observable";

describe('TimerHistoryComponent', () => {
  let component: TimerHistoryComponent;
  let httpServiceSpy: jasmine.SpyObj<HttpService>;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;

  beforeEach(async(() => {
    const httpSpy = jasmine.createSpyObj('HttpService', ['getProjects', 'getWorkPacks', 'getTasks', 'getTimeTracks']);
    const taskSpy = jasmine.createSpyObj('TaskService', ['getProjects']);

    TestBed.configureTestingModule({
        providers: [
            TimerHistoryComponent,
            {provide: HttpService, useValue: httpSpy},
            {provide: TaskService, useValue: taskSpy}
        ]});
        component = TestBed.get(TimerHistoryComponent);
        httpServiceSpy = TestBed.get(HttpService);
        taskServiceSpy = TestBed.get(TaskService);
    }));

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(httpServiceSpy).toBeTruthy();
    expect(taskServiceSpy).toBeTruthy();
  });

  it('ngOnInit should be executed', fakeAsync(() => {
      //Arrange Projects, which should be returned
      const projects = {
          PROJECT_OVERVIEW:
              [
                  {
                      TASK_NR: 1,
                      TASK_TYPE: 2,
                      NAME: "Testen1 getWorkPacks()",
                      STATUS: true,
                      DESCRIPTION: "Erstes Work-Package",
                      UNTIL_DATE: "2018-03-14",
                      COMPLETION_DATE: "2018-04-15",
                      PROJ_ID: 1,
                      PACK_ID: 2,
                      ARCHIVED: 1
                  }
              ]
      };

      //Arrange WorkPacks, which should be returned
      const workingPackages = {
          WORKING_PACKAGE_OVERVIEW:
              [
                  {
                      TASK_NR: 1,
                      TASK_TYPE: 2,
                      NAME: "Testen1 getWorkPacks()",
                      STATUS: true,
                      DESCRIPTION: "Erstes Work-Package",
                      UNTIL_DATE: "2018-03-14",
                      COMPLETION_DATE: "2018-04-15",
                      PROJ_ID: 1,
                      PACK_ID: 2,
                      ARCHIVED: 1
                  }]
      };
      //Arrange Tasks, which should be returned
      const tasks = {
          TASK_OVERVIEW:
              [
                  {
                      TASK_NR: 1,
                      TASK_TYPE: 2,
                      NAME: "Testen1 getWorkPacks()",
                      STATUS: true,
                      DESCRIPTION: "Erstes Work-Package",
                      UNTIL_DATE: "2018-03-14",
                      COMPLETION_DATE: "2018-04-15",
                      PROJ_ID: 1,
                      PACK_ID: 2,
                      ARCHIVED: 1
                  }]
      };

      httpServiceSpy.getProjects.and.callFake(() => {
          return Observable.from([projects]);
      });

      httpServiceSpy.getWorkPacks.and.callFake(() => {
          return Observable.from([workingPackages]);
      });

      httpServiceSpy.getTasks.and.callFake(() => {
          return Observable.from([tasks]);
      });

      httpServiceSpy.getTimeTracks.and.callFake(() => {
          return 1;
      });

      //setInterval
      jasmine.clock().install();
      component.ngOnInit();
      jasmine.clock().tick(2001); //enough that your interval gets tripped
      jasmine.clock().uninstall();

      expect(component.allProjects).toEqual(projects.PROJECT_OVERVIEW);
      expect(component.allWorkPacks).toEqual(workingPackages.WORKING_PACKAGE_OVERVIEW);
      expect(component.allTasks).toEqual(tasks.TASK_OVERVIEW);

      //getProject()
      let project1 = component.getProject(1);
      expect(project1).toEqual(projects.PROJECT_OVERVIEW[0]);

      //getWorkPack()
      let wp1 = component.getWorkPack(2);
      expect(wp1).toEqual(workingPackages.WORKING_PACKAGE_OVERVIEW[0]);

      //getTask()
      let task1 = component.getTask(3);
      expect(task1).toEqual(tasks.TASK_OVERVIEW[0]);
  }));

});
