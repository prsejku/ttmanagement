import { TestBed } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import { RegisterService } from "../register.service";
import { Router } from "@angular/router";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";


describe('RegistrationComponent', () => {
    let component: RegistrationComponent;
    let registerServiceSpy: jasmine.SpyObj<RegisterService>;
    let routerSpy: jasmine.SpyObj<Router>;

    beforeEach(() => {
        const registerSpy = jasmine.createSpyObj('RegisterService', ['register']);
        const routSpy = jasmine.createSpyObj('Router', ['navigate']);
        TestBed.configureTestingModule({
            providers: [
                RegistrationComponent,
                {provide: RegisterService, useValue: registerSpy},
                {provide: Router, useValue: routSpy},
                {provide: MatDialogRef, useValue: {}},
                {provide: MAT_DIALOG_DATA, useValue: []}
            ]
        });
        //Inject both the service-to-test and its (spy) dependencies
        component = TestBed.get(RegistrationComponent);
        registerServiceSpy = TestBed.get(RegisterService);
        routerSpy = TestBed.get(Router);
    });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(registerServiceSpy).toBeTruthy();
    expect(routerSpy).toBeTruthy();
  });

  it('RegisterService-Spy should call the method register', () => {
    //Act
    component.register();
    //Assert
    expect(registerServiceSpy.register).toHaveBeenCalled();
    });


});
