import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

// Verificamos si el usuario esta logueado,
// Si esta logueado dara true y podra seguir navegando
// Si NO esta logueado se redirige al login
export const authGuard: CanActivateFn = (route, state) => {
  // se obtiene el token para saber si inicio o no sesion
  const token = localStorage.getItem('token');
  console.log(route);
  console.log(state);
  const router = inject(Router);
  console.log('Im in auth guard');
  console.log('token', token);
  // si inicio sesion le permite acceso
  if (token){
    return true;
  } else{
    // si no inicio sesion lo redirige al login
    router.navigate(['/login']);
    return false;
  }
};
