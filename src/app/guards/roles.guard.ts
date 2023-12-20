import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CanActivateFn , Router} from '@angular/router';

export const rolesGuard: CanActivateFn = (route, state) => {
  console.log(route);
  console.log(state);
  const router = inject(Router);
  const authService = inject(AuthService);
  const nombreUsuario = localStorage.getItem("NombreTipoUser");

  if ((nombreUsuario === "Administrador") || (nombreUsuario === "SuperAdministrador")) {
    return true;
  } else {
    alert("No tienes permisos para visualizar esa pantalla");
    router.navigate(['/dashboard/tablero']);
    return false;
  }

};
