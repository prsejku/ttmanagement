import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskService } from '../task.service';
import { HttpService} from '../http.service';

import { ProjectsComponent } from './projects.component';
import {Task} from "../../models/Task";
import {Observable} from "rxjs/Observable";

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let httpService: HttpService;
  let taskService: TaskService;

  beforeEach((() => {
      const spyHttpService = jasmine.createSpyObj('HttpService', ['addProject']);
      const spyTaskService = jasmine.createSpyObj('TaskService', ['getProjects', 'getWorkPacks']);
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
   it('ngOnInit should be executed', () => {
     //Arrange-Setup
       component.taskType = null;
       component.toAdd = null;

      //Act-make the actual call
       component.ngOnInit();

      //Assert-Check and report whether the test passed or failed
      expect(component.toAdd).toBeDefined();
      expect(component.taskType).toBe('Project');
      expect(component.toAdd.DESCRIPTION).toBe(' ');
      expect(taskService.getProjects).toHaveBeenCalled();
      expect(taskService.getWorkPacks).toHaveBeenCalled();
   });

   //addProject()
   it('if toAdd.Name is undefined then do nothing', () => {
       //Arrange
       component.ngOnInit();
       component.toAdd.NAME = undefined;

       //Act
       component.addProject();

       //Asset
       expect (component.toAdd.NAME).toBeUndefined();
       });

   it('should call httpService-Spy to add a Project and taskService-Spy to get Projects, if taskType equals Project', () => {
       //Arrange
       component.ngOnInit();
       component.taskType = 'Project';
       component.toAdd.NAME = 'Neues Projekt';
       component.toAdd.DESCRIPTION = ' ';

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

       //Act
       component.addProject();

       //Assert
       expect(httpService.addProject).toHaveBeenCalled();
       expect(component.getProjects).toHaveBeenCalled();
       expect(taskService.getProjects).toHaveBeenCalled();
   });
});
