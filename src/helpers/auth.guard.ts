import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {map, take} from "rxjs";
import {AuthService} from "../service/auth.service";

export const authGuard: CanActivateFn = (
  route,
  state
) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.AuthenticatedUser$.pipe(
    take(1), // Take the first emitted value then complete
    map(user => {
      const roles = route.data['roles'] as Array<string>;
      if (user && user.role) {
        // Check if user has one of the required roles for this route
        if (roles.includes(user.role.name)) {
          return true;
        }

        // Redirect user based on their role
        if (user.role.name === 'ROLE_USER') {
          return router.createUrlTree(['/user-dashboard/dash']);
        } else if (user.role.name === 'ROLE_ADMIN') {
          return router.createUrlTree(['/main']);
        }
      }

      // User is not logged in or the role does not match any expected role
      return router.createUrlTree(['/login']);
    })
  );
}
