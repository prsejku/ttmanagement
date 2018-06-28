import { TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';


describe('MenuComponent', () => {
  let component: MenuComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
            MenuComponent,
        ]});
    component = TestBed.get(MenuComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
