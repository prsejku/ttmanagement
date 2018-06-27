import {TestBed } from '@angular/core/testing';

import { UserProfileComponent } from './user-profile.component';
import {HttpService} from "../http.service";

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let timerServiceSyp: jasmine.SpyObj<HttpService>;

   beforeEach(() => {
       const timerSyp = jasmine.createSpyObj('HttpService', ['enterTime']);
       TestBed.configureTestingModule({
           providers: [
               UserProfileComponent,
               {provide: HttpService, useValue: timerSyp}
           ]
       });

       component = TestBed.get(UserProfileComponent);
       timerServiceSyp = TestBed.get(HttpService);
   });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(timerServiceSyp).toBeTruthy();
  });
});
