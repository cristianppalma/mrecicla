import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  // Visualizar de acuerdo al rol
  usuarioTienePermiso: boolean;
  //
  nombreUsuario: string | null;
  idUsuario: string | null;



  constructor(
    private router: Router
  ) {
    // Visualizar de acuerdo al rol
    this.usuarioTienePermiso = this.verificarPermisosDelUsuario();
  }

  editarAdmin(){
    this.idUsuario = localStorage.getItem("id_user");
    const idUser =localStorage.getItem("id_user");
    //this.router.navigateByUrl('empleado/adminProfile');
    this.router.navigateByUrl(`dashboard/empleado/adminProfile/${idUser}`);

  }

   // Visualizar de acuerdo al rol
   private verificarPermisosDelUsuario(): boolean {
    const nombreUsuario = localStorage.getItem("NombreTipoUser");
    const puesto = localStorage.getItem("Puesto");
    // Realiza la lógica para determinar si el usuario tiene permiso basado en su rol
    return ((nombreUsuario === "Administrador") || (nombreUsuario === "SuperAdministrador")); // Ejemplo: el usuario con rol "admin" tiene permiso
  }


  // Se termina la sesion y eliminamos el token del localStorage
  logout(){
    // Para borrar el token del Local Storage
    localStorage.removeItem('token');
    localStorage.removeItem('id_user');
    localStorage.removeItem('NombreTipoUser');
    localStorage.removeItem('Nombre');
    localStorage.removeItem('Correo');
    // Para borrar todos los elementos del Local Storage
    // localStorage.clear();
    console.log('Se elimino el token');
    this.router.navigate(['/login'])
  }


  ngOnInit(): void {

    this.nombreUsuario = localStorage.getItem("NombreTipoUser");
    console.log('NombreTipoUser', this.nombreUsuario);

  }

 

}
