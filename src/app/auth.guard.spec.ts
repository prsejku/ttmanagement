import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

xdescribe('AuthGuard', () => {
  let loggedInGuard : AuthGuard;
  let authService: AuthService;
  let router = {
      navigate: jasmine.createSpy('navigate')
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard, AuthService,
          {provide: Router, useValue: router}
      ]
    });
    loggedInGuard = TestBed.get(AuthGuard);
    authService = TestBed.get(AuthService);
  });

  it("be able to hit route when user is logged in", () => {
    authService.isLoggedIn = true;
    expect(loggedInGuard.canActivate).toBe(true);
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
