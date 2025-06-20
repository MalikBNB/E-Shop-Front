import { Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../../account/account.service';
import { map, of } from 'rxjs';
import { IUser } from '../../shared/models/user';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = Inject(AccountService);
  const router = Inject(Router);

  if (accountService.currentUser$) {
    return of(true);
  } else {
    return accountService.currentUser$.pipe(
      map((auth) => {
        if (auth) {
          return true;
        } else {
          router.navgate(['account/login'], {
            queryParams: { returnUrl: state.url },
          });
          return false;
        }
      })
    );
  }
};
