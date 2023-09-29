import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {GetTokenMetadata, IsTokenExpired} from "@app/core/utils/functions/token";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const role = route.data['role'];

  const token = sessionStorage.getItem('access_token');
  if (!token) {
    router.navigateByUrl('/auth/login');
    return false;
  }

  if (IsTokenExpired(token)) {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    router.navigateByUrl('/auth/login');
    return false;
  }

  const tokenData = GetTokenMetadata(token);
  if (!tokenData) {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    router.navigateByUrl('/auth/login');
    return false;
  }

  if (role !== tokenData.rol) {
    router.navigateByUrl('/auth/login');
    return false;
  }

  return true;
};
