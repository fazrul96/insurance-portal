import {TestBed} from '@angular/core/testing';
import {CanActivateFn, Router} from '@angular/router';
import {userAuthGuard} from './user-auth.guard';
import {Store} from '@ngxs/store';

describe('userAuthGuard', () => {
  let mockStore: jasmine.SpyObj<Store>;
  let mockRouter: jasmine.SpyObj<Router>;

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => userAuthGuard(...guardParameters));

  beforeEach(() => {
    mockStore = jasmine.createSpyObj('Store', ['selectSnapshot']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: Router, useValue: mockRouter },
      ],
    });
  });

  it('should allow activation when user is logged in (custom auth)', () => {
    mockStore.selectSnapshot.and.returnValue(true); // simulate logged in

    const result = executeGuard({} as any, {} as any);

    expect(result).toBeTrue();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should block activation and redirect when user is not logged in', () => {
    mockStore.selectSnapshot.and.returnValue(false); // simulate not logged in

    const result = executeGuard({} as any, {} as any);

    expect(result).toBeFalse();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['login']);
  });
});
