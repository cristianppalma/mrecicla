import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SolicitudesService } from '../solicitudes.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AvisoDialogComponent } from 'src/app/maquinas/aviso-dialog/aviso-dialog.component'
import { MatTableModule } from '@angular/material/table';import { MatTableDataSource } from '@angular/material/table';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { Proveedor } from 'src/app/proveedor/proveedor';
import { AvisoErrorComponent } from 'src/app/maquinas/aviso-error/aviso-error.component';


interface Area {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-solicitudes-crear',
  templateUrl: './solicitudes-crear.component.html',
  styleUrls: ['./solicitudes-crear.component.css']
})
export class SolicitudesCrearComponent implements OnInit{
  
  Areas: Area[] = [
    {value: 'area1', viewValue: 'telares'},
    {value: 'area2', viewValue: 'hilado'},
    {value: 'area3', viewValue: 'otro'},
  ];
  proveedor: any[];
  formularioSolicitud: FormGroup;
  constructor(
    private router:Router,
    private _bottomSheet: MatBottomSheet,
    private formBuilder :FormBuilder,
    private SolicitudesService:SolicitudesService,
    private dialog:MatDialog
 ) {
  const correoSave=this.SolicitudesService.getCorreo();
  this.formularioSolicitud = this.formBuilder.group({
    //ID: ['', [Validators.required]],
    nombreProducto: ['', [Validators.required]],
    Peso: ['', [Validators.required]],
    Dimensiones: ['', [Validators.required]],  
    FechaPeticion: ['', [Validators.required]],
    Calibre: ['', [Validators.required]],
    idProveedor:['', [Validators.required]],
    Composicion:['', [Validators.required]],
    FechaRecepcion: ['', [Validators.required]],
    UsuarioCreador:[correoSave],
  });
 }

  Cancelar()
  {
    this.router.navigateByUrl('/dashboard/solicitudes/solicitudes');
  } 
    /**
    boton de abrir imagen
    */
  openBottomSheet(): void 
  {
    this._bottomSheet.open(BottomSheetOverviewExampleSheet);
  }

  enviarDatos(): void {
    if (this.formularioSolicitud.valid) 
    {
      console.log('Se presionó el botón');
      console.log(this.formularioSolicitud.value);
      this.SolicitudesService.agregarSolicitud(this.formularioSolicitud.value).subscribe(
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
/*  mostratDialogoAviso():void{
    const dialogAviso = this.dialog.open(AvisoDialogComponent,{
      data: {message: 'Se registro correctamente en la Base de Datos'}
    });
    dialogAviso.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigateByUrl('/dashboard/solicitudes/solicitudes');
      }
    });
  
  }*/

  mostratDialogoAviso(mensaje: string): void {
    const dialogAviso = this.dialog.open(AvisoDialogComponent, {
        data: { message: mensaje }
    });
    dialogAviso.afterClosed().subscribe(result => {
        if (result) {
            this.router.navigateByUrl('/dashboard/solicitudes/solicitudes');
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
    this.SolicitudesService.selectProveedor().subscribe((data)=>{
      this.proveedor=data;
    });
    console.log('AQUI ABAJO SE MOSTRARIA EL CORREO QUE SE TRAE DESDE EL LOCALSTORAGE');
    const correoSave = this.SolicitudesService.getCorreo();
    console.log('Correo desde el localStorage: ', correoSave);

    console.log('AQUI ABAJO SE MOSTRARIA EL NOMBRE QUE SE TRAE DESDE EL LOCALSTORAGE');
    const nombreSave = this.SolicitudesService.getNombre();
    console.log('Nombre desde el localStorage: ', nombreSave);
  }


  }










export class BottomSheetOverviewExampleSheet {
  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
    /**
    boton de abrir imagen
    */
