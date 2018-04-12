import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerHistoryComponent } from './timer-history.component';

describe('TimerHistoryComponent', () => {
  let component: TimerHistoryComponent;
  let fixture: ComponentFixture<TimerHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimerHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
