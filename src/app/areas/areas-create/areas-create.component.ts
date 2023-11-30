import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AreasService } from '../areas.service';
import { AvisoDialogComponent } from 'src/app/maquinas/aviso-dialog/aviso-dialog.component'
import { MatDialog } from '@angular/material/dialog';
import { AvisoErrorComponent } from 'src/app/maquinas/aviso-error/aviso-error.component';


@Component({
  selector: 'app-areas-create',
  templateUrl: './areas-create.component.html',
  styleUrls: ['./areas-create.component.css']
})
export class AreasCreateComponent implements OnInit {
  formularioAreas: FormGroup;

  constructor(
    private router:Router,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
     private areasService: AreasService
    ) {
      const correoSave = this.areasService.getCorreo();
      this.formularioAreas = this.formBuilder.group({
        NombreArea: ['', [Validators.required]],
        DescripcionArea: [''],
        EstadoArea: [''],
        UsuarioCreador:[correoSave],
      });
    }

  CANCELAR(){
    this.router.navigateByUrl('/dashboard/areas/areas');
  }
  enviarDatosArea(): void{
    if (this.formularioAreas.valid) {
      console.log('Se presionó el botón');
      console.log(this.formularioAreas.value);
      this.areasService.agregarArea(this.formularioAreas.value).subscribe(
        (response) => {
         if (response.success === 1) {
          console.log('Registro exitoso');
          this.mostratDialogoAviso(response.mensaje);
      } else {
          console.error('Error al registrar en la Base de Datos:', response.error);
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

  mostratDialogoAviso(mensaje: string): void {
    const dialogAviso = this.dialog.open(AvisoDialogComponent, {
        data: { message: mensaje }
    });
    dialogAviso.afterClosed().subscribe(result => {
        if (result) {
            this.router.navigateByUrl('/dashboard/areas/areas');
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
    // Puedes realizar alguna inicialización adicional aquí si es necesario.
    console.log('AQUI ABAJO SE MOSTRARIA EL CORREO QUE SE TRAE DESDE EL LOCALSTORAGE');
    const correoSave = this.areasService.getCorreo();
    console.log('Correo desde el localStorage: ', correoSave);

    console.log('AQUI ABAJO SE MOSTRARIA EL NOMBRE QUE SE TRAE DESDE EL LOCALSTORAGE');
    const nombreSave = this.areasService.getNombre();
    console.log('Nombre desde el localStorage: ', nombreSave);
  }


}
