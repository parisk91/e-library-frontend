import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core'

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  const expectedRole = route.data['expectedRole'];
  const user = userService.user();

  if (!user) {
    router.navigate(['login']);
    return false;
  }

  const role = userService.getRole();

  if (role === "ADMIN") {
    if (expectedRole === 'ADMIN') {
      return true;
    }
    return router.parseUrl('admin-dashboard');
  } else if (role === "USER") {
    if (expectedRole === 'USER') {
      return true;
    }
    return router.parseUrl('user-dashboard');
  } else {
    router.navigate(['login']);
    return false;
  }
};
