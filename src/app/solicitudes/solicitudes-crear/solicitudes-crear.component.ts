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
  formularioSolicitud: FormGroup;
  constructor(private router:Router,
 private _bottomSheet: MatBottomSheet,
 private formBuilder :FormBuilder,
 private SolicitudesService:SolicitudesService,
 private dialog:MatDialog
 ) {
  this.formularioSolicitud = this.formBuilder.group({
    ID: ['', [Validators.required]],
    nombreProducto: [''],
    Peso: [''],
    Dimensiones: [''],  
    FechaPeticion: [''],
    Calibre: [''],
    AreaDesignada:[''],
    Composicion:[''],
    FechaRecepcion: ['']
   
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
         console.log('Se registro correctamente');
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
      data: {message: 'Se registro correctamente en la Base de Datos'}
    });
    dialogAviso.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigateByUrl('/dashboard/solicitudes/solicitudes');
      }
    });
  
  }

  ngOnInit(): void {
    // Puedes realizar alguna inicialización adicional aquí si es necesario.
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
