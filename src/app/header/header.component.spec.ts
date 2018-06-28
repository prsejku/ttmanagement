import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {AuthService} from "../auth.service";
import {OpenService} from "../menu/open.service";

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let authServiceSpy: jasmine.SpyObj<AuthService>;
    let openServiceSpy: jasmine.SpyObj<OpenService>;

    beforeEach(() => {
        const authSpy = jasmine.createSpyObj('AuthService', ['login']);
        const openSpy = jasmine.createSpyObj('OpenService', ['toggle'])
        TestBed.configureTestingModule({
            providers: [
                HeaderComponent,
                {provide: AuthService, useValue: authSpy},
                {provide: OpenService, useValue: openSpy}
            ]});

        component = TestBed.get(HeaderComponent);
        authServiceSpy = TestBed.get(AuthService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(authServiceSpy).toBeTruthy();
    });
});