import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder, FormGroup, FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { PeriodicElement } from '../PeriodicElement';
import { SolicitudesService } from '../solicitudes.service';
import { ConfirmationDialogComponent } from 'src/app/maquinas/confirmation-dialog/confirmation-dialog.component';
import { HttpParams } from '@angular/common/http';
import { AvisoDialogComponent } from 'src/app/maquinas/aviso-dialog/aviso-dialog.component';
interface Area {
  value: string;
  viewValue: string;
}

export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-solicitudes-edit',
  templateUrl: './solicitudes-edit.component.html',
  styleUrls: ['./solicitudes-edit.component.css']
})
export class SolicitudesEditComponent implements OnInit{
  proveedor: any[];
  formularioEditarSolicitud:FormGroup;
  idsolicitud:any;
  Areas: Area[] = [
    {value: 'area1', viewValue: 'telares'},
    {value: 'area2', viewValue: 'hilado'},
    {value: 'area3', viewValue: 'otro'},
  ];
  

  constructor(private router:Router,
     private _bottomSheet: MatBottomSheet,
     public dialog: MatDialog,
     private formBuilder :FormBuilder,
       private SolicitudesService :SolicitudesService,
       private activateRoute: ActivatedRoute
     
     ) {
      const correoSave =this.SolicitudesService.getCorreo();
      this.formularioEditarSolicitud =this.formBuilder.group({
        nombreProducto:[''],
        Peso: [''],
        Dimensiones: [''],  
        FechaPeticion: [''],
        Calibre: [''],
        idProveedor:[''],
        Composicion:[''],
        FechaRecepcion:[''],
        UsuarioActualizador: [correoSave]
        
      });
      this.activateRoute.paramMap.subscribe(params =>{
        this.idsolicitud=params.get('id');
        console.log('ID recibido:', this.idsolicitud);
        this.SolicitudesService.consultarSolicitudes(this.idsolicitud).subscribe((respuesta=>{
         console.log('Respuesta del servicio:', respuesta);
          this.formularioEditarSolicitud.setValue({
            nombreProducto: respuesta.nombreProducto,
            Peso: respuesta.Peso,
            Dimensiones:  respuesta.Dimensiones,
            FechaPeticion: respuesta.FechaPeticion,
            Calibre: respuesta.Calibre,
            idProveedor: respuesta.idProveedor.toString(),
             //idProveedor: respuesta.Proveedor.toString(),
            Composicion: respuesta.Composicion,
            FechaRecepcion: respuesta.FechaRecepcion,
            UsuarioActualizador:respuesta.UsuarioActualizador || correoSave
          });
        }))
      })

     }
     enviarDatosActualizar(): void {
      if (this.formularioEditarSolicitud.valid) 
      {
        console.log('Se presionó el botón');
        console.log(this.formularioEditarSolicitud.value);
        this.SolicitudesService.editarSolicitud(this.idsolicitud,this.formularioEditarSolicitud.value).subscribe(
          (response) => {
           console.log('Se actualizo correctamente');
           this.mostratDialogoAviso();
           
          
          },
          (error) => {
             //Manejar errores del servicio aquí
          }
        );
      }
    }
    mostratDialogoAviso():void{
      const dialogAviso = this.dialog.open(AvisoDialogComponent,{
        data: {message: 'Se actualizo correctamente en la Base de Datos'}
      });
      dialogAviso.afterClosed().subscribe(result => {
        if (result) {
          this.router.navigateByUrl('/dashboard/solicitudes/solicitudes');
        }
      });
    
    }

     Cancelar(){
      this.router.navigateByUrl('/dashboard/solicitudes/solicitudes');
    }
    /**
    boton de abrir imagen
    */
  openBottomSheet(): void 
  {
    this._bottomSheet.open(BottomSheetOverviewExampleSheet);
  }
  ngOnInit(): void {
    // Puedes realizar alguna inicialización adicional aquí si es necesario.
    this.SolicitudesService.selectProveedor().subscribe((data)=>{
      this.proveedor=data;
    });

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
    @Component({
      selector: 'dialog-overview-example-dialog',
      templateUrl: 'dialog.component.html',
      standalone: true,
      imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
    })
    export class DialogOverviewExampleDialog {
      constructor(
        public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
      ) {}
    
      onNoClick(): void {
        this.dialogRef.close();
      }
    }

    