import { TestBed } from '@angular/core/testing';

import { TransporterGuard } from './transporter.guard';

describe('TransporterGuard', () => {
  let guard: TransporterGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TransporterGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
