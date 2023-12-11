import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmpresaService } from '../empresa.service';
import { AvisoDialogComponent } from 'src/app/maquinas/aviso-dialog/aviso-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AvisoErrorComponent } from 'src/app/maquinas/aviso-error/aviso-error.component';


@Component({
  selector: 'app-empresa-create',
  templateUrl: './empresa-create.component.html',
  styleUrls: ['./empresa-create.component.css']
})
export class EmpresaCreateComponent implements OnInit {

  formularioEmpresa: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private empresaService: EmpresaService,
    private dialog: MatDialog,
  ) {
    const correoSave = this.empresaService.getCorreo();
    this.formularioEmpresa = this.formBuilder.group({
      NombreFabrica: [''],
      DescripcionFabrica: [''],
      RFC: [''],
      Presupuesto: [''],
      DireccionFabrica: [''],
      TelefonoFabrica: [''],
      CorreoFabrica: [''],
      UsuarioCreador: [correoSave],
    });
  }

  cancelar() {
    this.router.navigateByUrl('/dashboard/empresas/empresas');
  }

  enviarDatos(): void {
    if (this.formularioEmpresa.valid) {
      console.log('Se presionó el botón');
      console.log(this.formularioEmpresa.value);
      this.empresaService.agregarEmpresas(this.formularioEmpresa.value).subscribe(
        (response) => {
          console.log('Respuesta del servidor: ', response);

         if (response.success === 1){
          console.log('Registro exitoso');
          this.mostratDialogoAviso(response.mensaje);
         } else {
          console.error('Error al registrar en la Base de Datos: ', response.error);
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

  mostratDialogoAviso(mensaje: string):void{
    const dialogAviso = this.dialog.open(AvisoDialogComponent,{
      data: {message: 'Se registro correctamente en la Base de Datos'}
    });
    dialogAviso.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigateByUrl('/dashboard/empresas/empresas');
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
    // TRAEMOS EL CORREO DESDE EL SERVICIO
    console.log('AQUI ABAJO SE MOSTRARIA EL CORREO QUE SE TRAE DESDE EL LOCALSTORAGE');
    const correoSave = this.empresaService.getCorreo();
    console.log('Correo desde el localStorage: ', correoSave);

    console.log('AQUI ABAJO SE MOSTRARIA EL NOMBRE QUE SE TRAE DESDE EL LOCALSTORAGE');
    const nombreSave = this.empresaService.getNombre();
    console.log('Nombre desde el localStorage: ', nombreSave);

  }

}
