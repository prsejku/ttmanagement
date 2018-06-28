import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {AuthService} from "../auth.service";
import {MatDialog} from "@angular/material";
import {Router} from "@angular/router";
import {HttpService} from "../http.service";
import {TimerHistoryComponent} from "../timer-history/timer-history.component";
import {TaskService} from "../task.service";

describe('LoginComponent', () => {
    let component: LoginComponent;
    let authServiceSpy: jasmine.SpyObj<AuthService>;
    let dialog: jasmine.SpyObj<MatDialog>

    //Not sure if we need a Router in Login Component?
    let router: jasmine.SpyObj<Router>


    beforeEach(() => {
        const authSpy = jasmine.createSpyObj('AuthService', ['login', 'logout']);
        const navigate = jasmine.createSpyObj('Router', ['navigate'])
        const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
        TestBed.configureTestingModule({
            providers: [
                LoginComponent,
                {provide: AuthService, useValue: authSpy},
                {provide: Router, useValue: navigate},
                {provide: MatDialog, useValue: dialogSpy}
            ]
      });
        component = TestBed.get(LoginComponent);
        authServiceSpy = TestBed.get(AuthService);

    });

    it('should create the component ', () => {
        expect(component).toBeTruthy();
        expect(authServiceSpy).toBeTruthy();
    });

    it ("should get email and pwd from LocalStorage", () => {
        //Arrange
        let email = "v.auberger@aon.at ";
        let pwd = "test123";
        localStorage.setItem('tmg_login', email + ' '+pwd);
        //Act
        component.ngOnInit();
        //Assert
        expect(component.email).toBe("v.auberger@aon.at");
        expect(component.pwd).toBe("test123");
        expect(authServiceSpy.login).toHaveBeenCalled();
    });

    it("should call login-method on the AuthService-Spy", () => {
        //Act
        component.ngOnInit();
        //Assert
        expect(authServiceSpy.login).toHaveBeenCalled();
    });

    it("should call logout-method on the AuthService-Spy", () => {
        //Act
        component.logout();
        //Assert
        expect(authServiceSpy.logout).toHaveBeenCalled();
    });







});



