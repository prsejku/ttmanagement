import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import {MenuComponent} from "../menu/menu.component";

describe('DashboardComponent', () => {
    let component: DashboardComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                DashboardComponent,
            ]});
        component = TestBed.get(DashboardComponent);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
