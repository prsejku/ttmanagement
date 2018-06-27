import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    let component: AppComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AppComponent,
            ]});
        component = TestBed.get(AppComponent);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
