import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ControlService } from '../control.service';
import { AvisoDialogComponent } from 'src/app/maquinas/aviso-dialog/aviso-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/maquinas/confirmation-dialog/confirmation-dialog.component';
import { AvisoErrorComponent } from 'src/app/maquinas/aviso-error/aviso-error.component';

@Component({
  selector: 'app-control-gastos-generales-crear',
  templateUrl: './control-gastos-generales-crear.component.html',
  styleUrls: ['./control-gastos-generales-crear.component.css']
})
export class ControlGastosGeneralesCrearComponent implements OnInit {
  areaNombre:  string | null;
  formularioGastos: FormGroup;
  empresas: any[]=[];
  areas:   any[]=[];
  maquina: any[]=[];
  usuarioSupervisor:boolean;
  usuarioSuper:boolean;
  usuarioAdmin:boolean;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private ControlService: ControlService,
    private dialog: MatDialog
  ) {
    this.usuarioSupervisor = this.verificarPuestoUser();
    this.usuarioSuper = this.verificarPermisosDelUsuarioSuper();
    this.usuarioAdmin = this.verificarPermisosDeladmin();
    const idFabrica = this.ControlService.getidFabrica();
    const correoSave = this.ControlService.getCorreo();
    const idAreaUser = this.ControlService.getidArea();
    this.formularioGastos = this.formBuilder.group({
      Concepto: ['', [Validators.required]],
      Descripcion: ['', [Validators.required]],
      Periodo: ['', [Validators.required]],
      Monto:['', [Validators.required]],
      Tipo:['', [Validators.required]],
      Area: [idAreaUser || ''],
      Maquina:[''],
      UsuarioCreador:[correoSave],
      Fabrica: [idFabrica],
    });
    //this.formularioGastos.get('Area')?.disable();
  }
  private verificarPuestoUser(): boolean{
    
    const puesto = localStorage.getItem("Puesto");
    // Realiza la lógica para determinar si el usuario tiene permiso basado en su rol
    return ((puesto === "Encargado de Área") ); 
  }

  private verificarPermisosDelUsuarioSuper(): boolean {
    const nombreUsuario = localStorage.getItem("NombreTipoUser");
    // Realiza la lógica para determinar si el usuario tiene permiso basado en su rol
    return ( (nombreUsuario === "SuperAdministrador" )); // Ejemplo: el usuario con rol "admin" tiene permiso
  }
  
  
  private verificarPermisosDeladmin(): boolean {
    const nombreUsuario = localStorage.getItem("NombreTipoUser");
    // Realiza la lógica para determinar si el usuario tiene permiso basado en su rol
    return ( (nombreUsuario === "Administrador")); // Ejemplo: el usuario con rol "admin" tiene permiso
  }
  

  CancelarGastosGeneralesCrear(){
    this.router.navigateByUrl('/dashboard/control/controlGastosGenerales');
  }

  mostrarDialogDeConfirmacion3(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: '¿Estás seguro de que deseas cancelar este registro?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigateByUrl('/dashboard/control/controlGastosGenerales');
      }
    });
  }

  enviarDatos(): void {
    if (this.formularioGastos.valid) {
      console.log('Se presionó el botón');
      console.log(this.formularioGastos.value);
      this.ControlService.agregargasto(this.formularioGastos.value).subscribe(
        (response) => {
         console.log('Respuesta del servidor: ', response);

        if (response.success === 1) {
          console.log('Se registro correctamente');
          this.mostratDialogoAviso();
        } else {
          console.error('Error al registrar en la Base de Datos', response.error);
          this.mostrarDialogError();
        }
        },
        (error) => {
          // Manejar errores del servicio aquí
          this.mostrarDialogError();
        }
      );
    }
  }

  mostratDialogoAviso():void{
    const dialogAviso = this.dialog.open(AvisoDialogComponent,{
      data: {message: 'Se registro correctamente en la Base de Datos'}
    });
    dialogAviso.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigateByUrl('/dashboard/control/controlGastosGenerales');
      }
    });
  }
  
  mostrarDialogError(): void {
    const dialogAviso = this.dialog.open(AvisoErrorComponent, {
        data: { message: 'Hubo un error al registrar en la Base de Datos' }
    });
    dialogAviso.afterClosed().subscribe(result => {
        if (result) {
            // Puedes realizar alguna acción adicional si es necesario
        }
    });
  }


  ngOnInit(): void {
    this.areaNombre = localStorage.getItem("NombreArea");
    console.log('ID: ', this.areaNombre);
    console.log('AQUI ABAJO SE MOSTRARIA EL idArea QUE SE TRAE DESDE EL LOCALSTORAGE');
    const idArea = this.ControlService.getidArea();
    console.log('Nombre desde el localStorage: ', idArea);

    this.ControlService.getAreas().subscribe((data) => {
      this.areas = data;
      //this.formularioGastos.get('Area')?.disable();
    });
 
    if (this.usuarioSupervisor) {
      // Encargado de Área
      this.ControlService.getMaquinas(idArea).subscribe((data2) => {
        this.maquina = data2;
      });
    } else if (this.usuarioAdmin || this.usuarioSuper) {
      // Administrador o SuperAdministrador
      this.ControlService.getmaquinaria().subscribe((data1) => {
        this.maquina = data1;
      });
    }
    // TRAEMOS EL CORREO DESDE EL SERVICIO
    console.log('AQUI ABAJO SE MOSTRARIA EL CORREO QUE SE TRAE DESDE EL LOCALSTORAGE');
    const correoSave = this.ControlService.getCorreo();
    console.log('Correo desde el localStorage: ', correoSave);
    console.log('AQUI ABAJO SE MOSTRARIA EL NOMBRE QUE SE TRAE DESDE EL LOCALSTORAGE');
    const nombreSave = this.ControlService.getNombre();
    console.log('Nombre desde el localStorage: ', nombreSave);
    


    this.areaNombre = localStorage.getItem("NombreArea");
    console.log('ID: ', this.areaNombre);
    console.log('Nombre desde el localStorage: ', idArea);
  
    // ... (resto del código)
  
    // Verifica que usuarioSupervisor tenga el valor correcto
    console.log('Valor de usuarioSupervisor:', this.usuarioSupervisor);


    this.ControlService.getEmpresas().subscribe((data2) => {
      this.empresas = data2;
    });
  }
}
