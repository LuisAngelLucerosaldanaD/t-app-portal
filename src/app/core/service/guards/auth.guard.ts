import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {inject} from "@angular/core";
import {GetTokenMetadata, IsTokenExpired} from "@app/core/utils/functions/token";

/**
 * Método que permite validar la sessión y el rol del usuario antes de redirigirlo a la url o recurso solicitado
 * @param {ActivatedRouteSnapshot} route
 * @param {RouterStateSnapshot} state
 */
export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const role: string[] = route.data['role'];

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

  if (role.includes(tokenData.rol)) return true;

  router.navigateByUrl('/auth/login');
  return false;
};
