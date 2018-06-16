import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPackTableComponent } from './work-pack-table.component';

xdescribe('WorkPackTableComponent', () => {
  let component: WorkPackTableComponent;
  let fixture: ComponentFixture<WorkPackTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkPackTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkPackTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
