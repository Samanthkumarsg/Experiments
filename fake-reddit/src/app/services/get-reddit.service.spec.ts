import { TestBed, inject } from '@angular/core/testing';

import { GetRedditService } from './get-reddit.service';

describe('GetRedditService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetRedditService]
    });
  });

  it('should be created', inject([GetRedditService], (service: GetRedditService) => {
    expect(service).toBeTruthy();
  }));
});
