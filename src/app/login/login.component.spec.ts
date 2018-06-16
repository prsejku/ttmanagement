import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {AuthService} from "../auth.service";
import {MatDialog} from "@angular/material";

xdescribe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let authService: AuthService;
    let dialog: MatDialog;


    beforeEach(() => {
      TestBed.configureTestingModule({
          declarations: [LoginComponent],
          providers: [AuthService],
          imports: [MatDialog]
      });
        //wrapper for component and his template
        fixture = TestBed.createComponent(LoginComponent);
        //to get the actual component
        component = fixture.componentInstance;
        authService = TestBed.get(AuthService);
        dialog = TestBed.get(MatDialog);
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });


    it('if already logged in do nothing', () => {
      authService.isLoggedIn = true;
      expect(component.ngOnInit()).toBeFalsy();
      //expect(authService.isLoggedIn).toHaveBeenCalled();
    });

    it('automatically log in if the credentials are already in the local storage',() => {
      authService.isLoggedIn = false;

    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });


});



