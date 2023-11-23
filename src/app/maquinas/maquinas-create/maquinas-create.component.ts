import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MaquinasService } from '../maquinas.service';
import { AvisoDialogComponent } from 'src/app/maquinas/aviso-dialog/aviso-dialog.component'
import { MatDialog } from '@angular/material/dialog';
import { AvisoErrorComponent } from 'src/app/maquinas/aviso-error/aviso-error.component';

@Component({
  selector: 'app-maquinas-create',
  templateUrl: './maquinas-create.component.html',
  styleUrls: ['./maquinas-create.component.css'],
})
export class MaquinasCreateComponent implements OnInit {
  formularioMaquina: FormGroup;
  areas: any[]=[];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private MaquinasService: MaquinasService,
    private dialog: MatDialog
  ) {
    const correoSave = this.MaquinasService.getCorreo();
    this.formularioMaquina = this.formBuilder.group({
      Numero: ['', [Validators.required]],
      Serie: [''],
      Modelo: ['',[Validators.required]],
      Descripcion: [''],
      Estado: ['',[Validators.required]],
      Area: [''],
      UsuarioCreador:[correoSave],
    });
  }

  CANCELAR() {
    this.router.navigateByUrl('/dashboard/maquinas/maquinas');
  }

  enviarDatos(): void {
    if (this.formularioMaquina.valid) {
      console.log('Se presionó el botón');
      console.log(this.formularioMaquina.value);
      this.MaquinasService.agregarMaquina(this.formularioMaquina.value).subscribe(
        (response) => {
         console.log('Respuesta del servidor',response);

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
  
  /*
  mostratDialogoAviso():void{
    const dialogAviso = this.dialog.open(AvisoDialogComponent,{
      data: {message: 'Se registro correctamente en la Base de Datos'}
    });
    dialogAviso.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigateByUrl('/dashboard/maquinas/maquinas');
      }
    });
  
  }

   
  mostrarDialogError():void{
    const dialogAviso = this.dialog.open(AvisoErrorComponent,{
      data: {message: 'Hubo un error al registrar en la Base de Datos'}
    });
    dialogAviso.afterClosed().subscribe(result => {
      if (result) {
      
      }
    });
  
  }*/
  mostratDialogoAviso(mensaje: string): void {
    const dialogAviso = this.dialog.open(AvisoDialogComponent, {
        data: { message: mensaje }
    });
    dialogAviso.afterClosed().subscribe(result => {
        if (result) {
            this.router.navigateByUrl('/dashboard/maquinas/maquinas');
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
    this.MaquinasService.getAreas().subscribe((data) => {
      this.areas = data;
    });

    console.log('AQUI ABAJO SE MOSTRARIA EL CORREO QUE SE TRAE DESDE EL LOCALSTORAGE');
    const correoSave = this.MaquinasService.getCorreo();
    console.log('Correo desde el localStorage: ', correoSave);

    console.log('AQUI ABAJO SE MOSTRARIA EL NOMBRE QUE SE TRAE DESDE EL LOCALSTORAGE');
    const nombreSave = this.MaquinasService.getNombre();
    console.log('Nombre desde el localStorage: ', nombreSave);
  }
}
