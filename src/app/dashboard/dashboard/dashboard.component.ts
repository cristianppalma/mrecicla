import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  // Visualizar de acuerdo al rol
  usuarioTienePermiso: boolean;
  usuarioSupervisor:boolean;
  usuarioLimpieza:boolean;

  constructor(
    private router: Router
  ) {
    // Visualizar de acuerdo al rol
    this.usuarioTienePermiso = this.verificarPermisosDelUsuario();
    this.usuarioSupervisor = this.verificarPuestoUser();
    this.usuarioLimpieza = this.verificarPuestoUserLimpieza();
  }

  // Visualizar de acuerdo al rol
  private verificarPermisosDelUsuario(): boolean {
    const nombreUsuario = localStorage.getItem("NombreTipoUser");
    const puesto = localStorage.getItem("Puesto");
    // Realiza la lógica para determinar si el usuario tiene permiso basado en su rol
    return ((nombreUsuario === "Administrador") || (nombreUsuario === "SuperAdministrador")); // Ejemplo: el usuario con rol "admin" tiene permiso
  }

  private verificarPuestoUser(): boolean{
    
    const puesto = localStorage.getItem("Puesto");
    // Realiza la lógica para determinar si el usuario tiene permiso basado en su rol
    return ((puesto === "Encargado de Área") ); 
  }
  private verificarPuestoUserLimpieza(): boolean{
    
    const puesto = localStorage.getItem("Puesto");
    // Realiza la lógica para determinar si el usuario tiene permiso basado en su rol
    return ((puesto === "Limpieza") ); 
  }

}
