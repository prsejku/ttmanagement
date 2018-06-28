import { async, TestBed } from '@angular/core/testing';

import { ProjectReportComponent } from './project-report.component';
import {HttpService} from "../http.service";


describe('ProjectReportComponent', () => {
  let component: ProjectReportComponent;
  let httpServiceSpy: jasmine.SpyObj<HttpService>;

  beforeEach(async(() => {
    const httpSpy = jasmine.createSpyObj('HttpService', ['enterTime']);
    TestBed.configureTestingModule({
        providers: [
            ProjectReportComponent,
            {provide: HttpService, useValue: httpSpy} ]
    });
    component = TestBed.get(ProjectReportComponent);
    httpServiceSpy = TestBed.get(HttpService);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(httpServiceSpy).toBeTruthy();
  });
});
