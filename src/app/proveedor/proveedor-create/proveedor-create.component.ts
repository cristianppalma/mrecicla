import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProveedorService } from '../proveedor.service';
import { AvisoDialogComponent } from '../aviso-dialog/aviso-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AvisoErrorComponent } from 'src/app/maquinas/aviso-error/aviso-error.component';

@Component({
  selector: 'app-proveedor-create',
  templateUrl: './proveedor-create.component.html',
  styleUrls: ['./proveedor-create.component.css'],
})
export class ProveedorCreateComponent implements OnInit {
  formularioProveedor: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private proveedorService: ProveedorService,
    private dialog: MatDialog,
  ) {
    const correoSave = this.proveedorService.getCorreo();
    const idFabricaUsuario = this.proveedorService.getIdFabricaUsuario();
    this.formularioProveedor = this.formBuilder.group({
      NombreProveedor: [''],
      ProductoProveedor: [''],
      DireccionProveedor: [''],
      Telefono: [''],
      Correo: [''],
      RFCProveedor: [''],
      DescripcionProveedor: [''],
      EstatusProveedor: ['Activo'],
      UsuarioCreador: [correoSave],
      idFabrica: [idFabricaUsuario]
    });
  }

  CANCELAR() {
    this.router.navigateByUrl('/dashboard/proveedor/proveedores');
  }

  enviarDatos(): void {
    if (this.formularioProveedor.valid) {
      console.log('Se presionó el botón');
      console.log(this.formularioProveedor.value);
      this.proveedorService.agregarProveedor(this.formularioProveedor.value).subscribe(
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
        this.router.navigateByUrl('/dashboard/proveedor/proveedores');
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
     const correoSave = this.proveedorService.getCorreo();
     console.log('Correo desde el localStorage: ', correoSave);

     console.log('AQUI ABAJO SE MOSTRARIA EL NOMBRE QUE SE TRAE DESDE EL LOCALSTORAGE');
     const nombreSave = this.proveedorService.getNombre();
     console.log('Nombre desde el localStorage: ', nombreSave);

  }
}
