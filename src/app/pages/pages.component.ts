import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent {

  // Visualizar de acuerdo al rol
  // usuarioTienePermiso: boolean;

  constructor(
    private router: Router
  ) {
    // Visualizar de acuerdo al rol
    // this.usuarioTienePermiso = this.verificarPermisosDelUsuario();
  }

  // Visualizar de acuerdo al rol
  // private verificarPermisosDelUsuario(): boolean {
  //   const puesto = localStorage.getItem("Puesto");
  //   // Realiza la lógica para determinar si el usuario tiene permiso basado en su rol
  //   return puesto === "Administrador"; // Ejemplo: el usuario con rol "admin" tiene permiso
  // }


  // Se termina la sesion y eliminamos el token del localStorage
  logout(){
    // Para borrar el token del Local Storage
    localStorage.removeItem('token');
    // Para borrar todos los elementos del Local Storage
    // localStorage.clear();
    console.log('Se elimino el token');
    this.router.navigate(['/login'])
  }

}
