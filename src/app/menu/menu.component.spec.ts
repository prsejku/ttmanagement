import { TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import {HttpClient} from "@angular/common/http";
import {OpenService} from "./open.service";
import {MessageService} from "../message.service";
import {AuthService} from "../auth.service";


describe('MenuComponent', () => {
  let component: MenuComponent;
  let openServiceSpy: jasmine.SpyObj<OpenService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const openSpy = jasmine.createSpyObj('OpenService', ['toggle']);
    const authSpy = jasmine.createSpyObj('AuthService', ['login']);
    TestBed.configureTestingModule({
        providers: [
            MenuComponent,
            {provide: OpenService, useValue: openSpy},
            {provide: AuthService, useValue: authSpy}
        ]});
    component = TestBed.get(MenuComponent);
    openServiceSpy = TestBed.get(OpenService);
    authServiceSpy = TestBed.get(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(openServiceSpy).toBeTruthy();
    expect(authServiceSpy).toBeTruthy();
  });
});
