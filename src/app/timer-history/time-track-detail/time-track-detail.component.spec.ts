import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTrackDetailComponent } from './time-track-detail.component';

describe('TimeTrackDetailComponent', () => {
  let component: TimeTrackDetailComponent;
  let fixture: ComponentFixture<TimeTrackDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeTrackDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeTrackDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
