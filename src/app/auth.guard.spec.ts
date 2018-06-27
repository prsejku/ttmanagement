import {TestBed} from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

describe('AuthGuard', () => {
  let component : AuthGuard;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;


  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['login', 'getIsLoggedInStatus']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
        providers: [
            AuthGuard,
            {provide: AuthService, useValue: authSpy},
            {provide: Router, useValue: routerSpy}
      ]
    });

    component = TestBed.get(AuthGuard);
    authServiceSpy = TestBed.get(AuthService);
    router = TestBed.get(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(authServiceSpy).toBeTruthy();
    expect(router).toBeTruthy();
  });

  it('should set the right redirectUrl in the AuthService', () => {
    //Arrange
    const url = 'www.trackMyGoody.com';
    authServiceSpy.getIsLoggedInStatus.and.returnValue(true);

    //Act
   component.checkLogin(url);

   //Assert
   expect(authServiceSpy.redirectUrl).toBe('www.trackMyGoody.com');
  });

  it('should call method navigate of the RouteSpy', () => {
    //Arrange
    const url = 'www.trackMyGoody.com';
    authServiceSpy.getIsLoggedInStatus.and.returnValue(false);

    //Act
    component.checkLogin(url);

    //Assert
    expect(router.navigate).toHaveBeenCalled();
  });
});


