import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AvisoLoginComponent } from '../aviso-login/aviso-login.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent  implements OnInit {

  formularioLogin: FormGroup;

  login(){
    this.router.navigateByUrl('/dashboard/tablero');
  }

  registro(){
    this.router.navigateByUrl('/registrarse');
  }

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private AuthService: AuthService,
    private dialog: MatDialog
  )
   {
    this.formularioLogin = this.formBuilder.group({
      Correo: ['', Validators.required],
      Pass: ['', Validators.required],
    });
  }

  enviarDatos(): void {
    if (this.formularioLogin.valid) {
      console.log('Se presionó el botón');
      console.log(this.formularioLogin.value);
      this.AuthService.verUsuario(this.formularioLogin.value).subscribe(

        (response) => {
          if (response.hasOwnProperty('error')) {
            // Se encontró un mensaje de error en la respuesta
            console.log('Error: ' + response.error);
            this.mostrarDialogoLoginError(response.error);
          } else {
            console.log('Se logueó correctamente');
            // Se crea el token de forma ramdon para iniciar sesion
            localStorage.setItem('token', Math.random().toString());
            this.router.navigateByUrl('/dashboard/tablero');

            // Obtenemos el id del usuario
            let usuario = response.idUsuario;
            localStorage.setItem("id_user", usuario );
            // Obtenemos el nombre del usuario
            let usuarioNombre = response.Nombre;
            localStorage.setItem("Nombre", usuarioNombre );
            // Obtenemos el correo del usuario
            let usuarioCorreo = response.Correo;
            localStorage.setItem("Correo", usuarioCorreo );
            // Obtenemos el tipo del usuario
            let nombreUsuario = response.NombreTipoUser;
            localStorage.setItem("NombreTipoUser", nombreUsuario);
            // Obtenemos el nombre del area del usuario
            let NombreArea = response.NombreArea;
            localStorage.setItem("NombreArea",NombreArea);
            // Obtenemos el id del area del usuario
            let idArea = response.idArea;
            localStorage.setItem("idArea",idArea);
            // Obtenemos el nombre de la fabrica del usuario
            let NombreFabrica = response.NombreFabrica;
            localStorage.setItem("NombreFabrica", NombreFabrica);
            // Obtenemos el id de la fabrica del usuario
            let idFabrica = response.idFabrica;
            localStorage.setItem("idFabrica",idFabrica);

          }
        },
        (error) => {
          // Manejar errores del servicio aquí
          console.log('No se pudo loguear :c');
          this.mostrarDialogoLoginError('Hubo un error en el servidor');
        }
      );
    }
  }

  mostratDialogoLogin():void{
    const dialogAviso = this.dialog.open(AvisoLoginComponent,{
      data: {message: 'Se registro correctamente en la Base de Datos'}
    });
    dialogAviso.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigateByUrl('/dashboard/maquinas/maquinas');
      }
    });

  }

  mostrarDialogoLoginError(errorMsg: string): void {
    const dialogRef = this.dialog.open(AvisoLoginComponent, {
      data: { message: errorMsg },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
    // Puedes realizar alguna inicialización adicional aquí si es necesario.
  }

}
