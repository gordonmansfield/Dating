import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  // Check if the user is authenticated
  const accountService = inject(AccountService);
  const toastr = inject(ToastrService);
  if (!accountService.currentUser()) {
    toastr.error('You are not authorized to access this page');
    return false;
  }
  return true;
};
