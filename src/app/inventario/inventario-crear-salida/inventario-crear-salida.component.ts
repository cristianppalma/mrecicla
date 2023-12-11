import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { InventarioSalidaService } from '../inventario-salida.service';
import { MatDialog } from '@angular/material/dialog';
import { AvisoDialogComponent } from 'src/app/maquinas/aviso-dialog/aviso-dialog.component';
import { AvisoErrorComponent } from 'src/app/maquinas/aviso-error/aviso-error.component';

@Component({
  selector: 'app-inventario-crear-salida',
  templateUrl: './inventario-crear-salida.component.html',
  styleUrls: ['./inventario-crear-salida.component.css']
})
export class InventarioCrearSalidaComponent implements OnInit {

  areas: any[] = [];
  formularioInventarioSalida: FormGroup;

  constructor(
    private router:Router,
    private formBuilder:FormBuilder,
    private inventarioServiceSalida:InventarioSalidaService,
    private dialog:MatDialog,
  )
  {
    const correoSave = this.inventarioServiceSalida.getCorreo();
    const idFabricaUsuario = this.inventarioServiceSalida.getIdFabricaUsuario();
    this.formularioInventarioSalida = this.formBuilder.group({
      nombreProducto: [''],
      peso: [''],
      fechaRegistro: [''],
      calibre: [''],
      idArea: [''],
      UsuarioCreador: [correoSave],
      idFabrica: [idFabricaUsuario]
    })
  }

  enviarDatos(): void {
    if (this.formularioInventarioSalida.valid) {
      console.log('Se presiono el boton para enviar los datos');
      console.log(this.formularioInventarioSalida.value);
      this.inventarioServiceSalida.agregarInventarioSalida(this.formularioInventarioSalida.value).subscribe(
        (response) => {
          console.log('Respuesta del servidor: ', response);

          if (response.success === 1){
            console.log('Registro exitoso');
            this.mostrarDialogoAviso();
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

  mostrarDialogoAviso():void{
    const dialogAviso = this.dialog.open(AvisoDialogComponent,{
      data: {message: 'Se registro correctamente en la Base de Datos'}
    });
    dialogAviso.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigateByUrl('/dashboard/inventario/catalogo-inventario-salida');
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
    const correoSave = this.inventarioServiceSalida.getCorreo();
    console.log('Correo desde el localStorage: ', correoSave);

    console.log('AQUI ABAJO SE MOSTRARIA EL NOMBRE QUE SE TRAE DESDE EL LOCALSTORAGE');
    const nombreSave = this.inventarioServiceSalida.getNombre();
    console.log('Nombre desde el localStorage: ', nombreSave);

    //
    this.inventarioServiceSalida.selectAreas().subscribe((data) => {
      this.areas = data;
    });


  }


  regresar (){
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

}
