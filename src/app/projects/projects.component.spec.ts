import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskService } from '../task.service';
import { HttpService} from '../http.service';

import { ProjectsComponent } from './projects.component';
import {Task} from "../../models/Task";
import {Observable} from "rxjs/Observable";

xdescribe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let httpService: HttpService;
  let taskService: TaskService;

  beforeEach((() => {
      const spyHttpService = jasmine.createSpyObj('HttpService', ['getUser', 'setUser']);
      const spyTaskService = jasmine.createSpyObj('TaskService', ['getProjects']);
      TestBed.configureTestingModule({
      providers: [
          ProjectsComponent,
          { provide: HttpService, useValue: spyHttpService},
          { provide: TaskService, useValue: spyTaskService}
      ]
    });
    component = TestBed.get(ProjectsComponent);
    httpService = TestBed.get(HttpService);
    taskService = TestBed.get(TaskService);
  }));

  it('should create', () => {
    expect(taskService).toBeTruthy();
    expect(httpService).toBeTruthy();
    expect(component).toBeTruthy();
  });

  //ngOnInit
   xit('ngOnInit should be executed', () => {
     //Arrange-Setup
       component.taskType = null;
       component.toAdd = null;
       //component.toAdd.DESCRIPTION;
       /*const projects: Task[] = [
           {
               TASK_NR: 1,
               TASK_TYPE:0,
               NAME: 'SpyProjekt',
               STATUS: 1,
               DESCRIPTION: 'SpyTestProjekt1',
               UNTIL_DATE: '14.05.2019',
               COMPLETION_DATE: '10.05.2018',
               PROJ_ID: null,
               PACK_ID: null,
               ARCHIVED: 1,
           }
       ];
       const workpacks: Task[] = [
           {
               TASK_NR: 2,
               TASK_TYPE:2,
               NAME: 'SpyWorkPack',
               STATUS: 1,
               DESCRIPTION: 'SpyTestWorkPack',
               UNTIL_DATE: '14.05.2019',
               COMPLETION_DATE: '10.05.2018',
               PROJ_ID: 1,
               PACK_ID: null,
               ARCHIVED: 1,
           }
       ];*/

      //spyOn(taskService, 'getProjects').and.returnValue(Observable.from([projects]));
      //spyOn(taskService, 'getWorkPacks').and.returnValue([workpacks]);

      //Act-make the actual call
       component.ngOnInit();

      //Assert-Check and report whether the test passed or failed
      expect(taskService.projects).toEqual(this.projects);
   });

   //addProject()
   it('if toAdd.Name = Undefined then do nothing', () => {
       //Arrange
       component.toAdd.NAME = undefined;
       const projects: Task[] = [
           {
               TASK_NR: 1,
               TASK_TYPE:0,
               NAME: undefined,
               STATUS: 1,
               DESCRIPTION: 'SpyTestProjekt1',
               UNTIL_DATE: '14.05.2019',
               COMPLETION_DATE: '10.05.2018',
               PROJ_ID: null,
               PACK_ID: null,
               ARCHIVED: 1,
           }
       ];
       //component.toAdd = projects;

       //Act
       component.addProject();

       //Asset
       expect (component.toAdd.NAME).toBeNull();

       })
});
