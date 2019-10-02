import { TestBed } from '@angular/core/testing';

import { ConnectivityService } from './connectivity-service';

describe('ConnectivityServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConnectivityService = TestBed.get(ConnectivityService);
    expect(service).toBeTruthy();
  });
});
