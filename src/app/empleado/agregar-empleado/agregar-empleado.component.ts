import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, FormsModule } from '@angular/forms';
import { EmpleadoService } from '../empleado.service';
import { AvisoDialogComponent } from '../aviso-dialog/aviso-dialog.component'
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-agregar-empleado',
  templateUrl: './agregar-empleado.component.html',
  styleUrls: ['./agregar-empleado.component.css']
})
export class AgregarEmpleadoComponent implements OnInit{


  usuarioTienePermiso: boolean;
  usuarioTienePermisoSuper: boolean;


  formularioEmpleado: FormGroup;
  areas : any[]= [];
  puestos : any[]= [];
  tipoUsuarios : any[]= [];
  fabricas : any[]= [];
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private EmpleadoService: EmpleadoService,
    private dialog: MatDialog
  ) {
    const correoSave = this.EmpleadoService.getCorreo();
    const nombreUsuario = this.EmpleadoService.getTipoUsuario();
    const idFabricaUsuario = this.EmpleadoService.getIdFabricaUsuario();

    if (nombreUsuario === "SuperAdministrador") {
    this.formularioEmpleado = this.formBuilder.group({
      Nombre: [''],
      ApellidoPaterno: [''],
      ApellidoMaterno: [''],
      Correo: [''],
      Pass: [''],
      Practicante: ['No'],
      Sueldo : [''],
      Turno : ['Sin turno'],
      Domicilio : [''],
      idFabrica: [''],
      idTipoUsuario : [1],
      idAsignacion : [1],
      idArea : ['General'],
      UsuarioCreador : [correoSave]
    });
    } else {
      this.formularioEmpleado = this.formBuilder.group({
        Nombre: [''],
        ApellidoPaterno: [''],
        ApellidoMaterno: [''],
        Correo: [''],
        Pass: [''],
        Practicante: ['No'],
        Sueldo : [''],
        Turno : [''],
        Domicilio : [''],
        idFabrica : [idFabricaUsuario],
        idTipoUsuario : [2],
        idAsignacion : [''],
        idArea : [''],
        UsuarioCreador : [correoSave]
      });
    }


    this.usuarioTienePermiso = this.verificarPermisosDelUsuario();


    this.usuarioTienePermisoSuper = this.verificarPermisosDelUsuarioSuper();


  }


  private verificarPermisosDelUsuario(): boolean {
    const nombreUsuario = localStorage.getItem("NombreTipoUser");
    const puesto = localStorage.getItem("Puesto");
    // Realiza la lógica para determinar si el usuario tiene permiso basado en su rol
    return ((nombreUsuario === "Administrador")); // Ejemplo: el usuario con rol "admin" tiene permiso
  }


  private verificarPermisosDelUsuarioSuper(): boolean {
    const nombreUsuario = localStorage.getItem("NombreTipoUser");
    const puesto = localStorage.getItem("Puesto");
    // Realiza la lógica para determinar si el usuario tiene permiso basado en su rol
    return ( (nombreUsuario === "SuperAdministrador")); // Ejemplo: el usuario con rol "admin" tiene permiso
  }


  cancelar() {
    if (window.history.length > 1) {
      // Si hay más de una página en el historial, regresa a la página anterior
      window.history.back();
    } else {
      // Si no hay más páginas en el historial, puedes redirigir a una página específica
      // o realizar alguna otra acción en su lugar.
      console.warn('No hay páginas anteriores en el historial.');
      // Puedes redirigir a otra página o realizar otra acción aquí
    }
  }

  enviarDatos(): void {
    if (this.formularioEmpleado.valid) {
      console.log('Se presionó el botón');
      console.log(this.formularioEmpleado.value);
      this.EmpleadoService.AgregarUsuartio(this.formularioEmpleado.value).subscribe(
        (response) => {
         console.log('Se registro correctamente');
         this.mostratDialogoAviso();

        },
        (error) => {
          console.log('Aqui trono');
          console.log(error);
          // Manejar errores del servicio aquí
        }
      );
    }
  }
  mostratDialogoAviso():void{
    console.log('Tumadre');
    const dialogAviso = this.dialog.open(AvisoDialogComponent,{
      data: {message: 'Se registro correctamente en la Base de Datos'}
    });
    dialogAviso.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigateByUrl('/dashboard/empleado/listEmp');
      }
    });

  }

  ngOnInit(): void {

    this.formularioEmpleado.controls['Practicante'].valueChanges.subscribe(
      (Practicante) => {
        if (Practicante === 'No') {
          this.formularioEmpleado.controls['idAsignacion'].enable();
          this.formularioEmpleado.controls['Turno'].enable();
          this.formularioEmpleado.controls['idArea'].enable();
          this.formularioEmpleado.controls['Sueldo'].enable();

        } else {
          this.formularioEmpleado.controls['idAsignacion'].disable();
          this.formularioEmpleado.controls['Turno'].disable();
          this.formularioEmpleado.controls['idArea'].disable();
          this.formularioEmpleado.controls['Sueldo'].disable();

          this.formularioEmpleado.controls['idAsignacion'].reset();
          this.formularioEmpleado.controls['Turno'].reset();
          this.formularioEmpleado.controls['idArea'].reset();
          this.formularioEmpleado.controls['Sueldo'].reset();
        }
      }

    );

    // Puedes realizar alguna inicialización adicional aquí si es necesario.
    this.EmpleadoService.SelectAreas().subscribe((data) => {
      this.areas=data;
    });

    this.EmpleadoService.SelectPuestos().subscribe((data) => {
      this.puestos=data;
    });

    this.EmpleadoService.SelectTipoUsuarios().subscribe((data) => {
      this.tipoUsuarios=data;
    });

    this.EmpleadoService.SelectFabricas().subscribe((data) => {
      this.fabricas=data;
    });

     // TRAEMOS EL CORREO DESDE EL SERVICIO
     console.log('AQUI ABAJO SE MOSTRARIA EL CORREO QUE SE TRAE DESDE EL LOCALSTORAGE');
     const correoSave = this.EmpleadoService.getCorreo();
     console.log('Correo desde el localStorage: ', correoSave);

     console.log('AQUI ABAJO SE MOSTRARIA EL NOMBRE QUE SE TRAE DESDE EL LOCALSTORAGE');
     const nombreSave = this.EmpleadoService.getNombre();
     console.log('Nombre desde el localStorage: ', nombreSave);

  }

}
