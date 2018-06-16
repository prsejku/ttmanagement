import {TestBed, inject, fakeAsync} from '@angular/core/testing';

import { AuthService } from './auth.service';
import {HttpClient} from "@angular/common/http";
import {HttpService} from "./http.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs/Observable";

describe('AuthService', () => {
  let authService: AuthService;
  let timerServiceSpy: jasmine.SpyObj<HttpService>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpService', ['getUser', 'setUser']);
    const spyHttp = jasmine.createSpyObj('HttpClient', ['get']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
        providers: [
            AuthService,
            {provide: HttpService, useValue: spy},
            {provide: HttpClient, useValue: spyHttp},
            {provide: Router, useValue: routerSpy}
         ]
    });
    //Inject both the service-to-test and its (spy) dependencies
    authService = TestBed.get(AuthService);
    timerServiceSpy = TestBed.get(HttpService);
    httpClientSpy = TestBed.get(HttpClient);
    });


  it('should be created', () => {
    expect(authService).toBeTruthy();
    expect(timerServiceSpy).toBeTruthy();
    expect(httpClientSpy).toBeTruthy();
  });

  //login-method
  it ('should check if logged in after login()-methode', () => {

      //Arrange
      let email = "v.auberger@aon.at";
      let pwd = "test123";
      let stay = true;
      authService.isLoggedIn = false;
      let response = {
          users: [
              {
                FIRSTNAME: "Verena",
                LASTNAME: "Auberger",
                MAIL: "v.auberger@aon.at",
                PERSON_TYPE: "0",
                PW: "test123",
                USERNAME: "Verena_A",
                USER_ID: "3",
                WORKSPACE: "1"
              }
          ]
      };

      httpClientSpy.get.and.callFake(() => {
          return Observable.from([response]);
      });

      //Act
      authService.login(email, pwd, stay);

      //Assert
      expect(authService.isLoggedIn).toBe(true);
  });

  it('should set LocalStorage if stay is true', () => {
      //Arrange
      let email = "v.auberger@aon.at";
      let pwd = "test123";
      let stay = true;
      let response = {
          users: [
              {
                  FIRSTNAME: "Verena",
                  LASTNAME: "Auberger",
                  MAIL: "v.auberger@aon.at",
                  PERSON_TYPE: "0",
                  PW: "test123",
                  USERNAME: "Verena_A",
                  USER_ID: "3",
                  WORKSPACE: "1"
              }
          ]
      };

      httpClientSpy.get.and.callFake(() => {
          return Observable.from([response]);
      });

      //Act
      authService.login(email, pwd, stay);

      //Assert
      expect(localStorage.hasOwnProperty('tmg_login')).toBeTruthy();
  });

  it('should not set LocalStorage if stay is false', () => {
      //Arrange
      let email = "v.auberger@aon.at";
      let pwd = "test123";
      let stay = false;
      let response = {
          users: [
              {
                  FIRSTNAME: "Verena",
                  LASTNAME: "Auberger",
                  MAIL: "v.auberger@aon.at",
                  PERSON_TYPE: "0",
                  PW: "test123",
                  USERNAME: "Verena_A",
                  USER_ID: "3",
                  WORKSPACE: "1"
              }
          ]
      };

      httpClientSpy.get.and.callFake(() => {
          return Observable.from([response]);
      });

      //Act
      authService.login(email, pwd, stay);

      //Assert
      expect(localStorage.hasOwnProperty('tmg_login')).toBeFalsy();
});

  it ('should set attribut isLoggedIn to false after logout()-method', () => {
    //Arrange
    authService.isLoggedIn = true;

    //Act
    authService.logout();

    //Assert
    expect(authService.isLoggedIn).toBeFalsy();
    expect(timerServiceSpy.user).toBeNull();
  });

  it('should remove login-item in LocalStorage after the logout()-method', () => {
      //Arrange
      let email = "v.aubergerger@aon.at";
      let pwd = "test123";
      localStorage.setItem('tmg_login', email + ' '+pwd);

      //Act
      authService.logout();

      //Assert
      expect(localStorage.hasOwnProperty('tmg_login')).toBeFalsy();
  });
});
