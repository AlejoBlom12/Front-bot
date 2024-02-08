import { TestBed } from '@angular/core/testing';

import { SubclaseService } from './subclase.service';

describe('SubclaseService', () => {
  let service: SubclaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubclaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
