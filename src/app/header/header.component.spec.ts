import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {AuthService} from "../auth.service";

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let authServiceSpy: jasmine.SpyObj<AuthService>;

    beforeEach(() => {
        const authSpy = jasmine.createSpyObj('AuthService', ['login']);
        TestBed.configureTestingModule({
            providers: [
                HeaderComponent,
                {provide: AuthService, useValue: authSpy}
            ]});

        component = TestBed.get(HeaderComponent);
        authServiceSpy = TestBed.get(AuthService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(authServiceSpy).toBeTruthy();
    });
});