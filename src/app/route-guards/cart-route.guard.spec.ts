import { TestBed, async, inject } from '@angular/core/testing';

import { CartRouteGuard } from './cart-route.guard';

describe('CartRouteGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartRouteGuard]
    });
  });

  it('should ...', inject([CartRouteGuard], (guard: CartRouteGuard) => {
    expect(guard).toBeTruthy();
  }));
});
