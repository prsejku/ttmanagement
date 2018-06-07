import { TestBed, inject } from '@angular/core/testing';

import { OpenService } from './open.service';

describe('OpenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpenService]
    });
  });

  it('should be created', inject([OpenService], (service: OpenService) => {
    expect(service).toBeTruthy();
  }));
});
