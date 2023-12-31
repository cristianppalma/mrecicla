import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { InventarioService } from '../inventario.service';
import { InventarioSalidaService } from '../inventario-salida.service';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { AvisoDialogComponent } from 'src/app/maquinas/aviso-dialog/aviso-dialog.component';
import { PeriodicElement } from '../PeriodicElement';
import { PeriodicElement2 } from '../PeriodicElement2';
import { MatTableDataSource } from '@angular/material/table';

//paqueteria prueba
interface Area {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-inventario-edit-salida',
  templateUrl: './inventario-edit-salida.component.html',
  styleUrls: ['./inventario-edit-salida.component.css']
})

export class InventarioEditSalidaComponent implements OnInit {

  //valores prueba
  areas : any[]=[];
  formularioEditarInventarioSalida:FormGroup;
  idProductosalida:any;

  constructor(private router:Router,
    private _bottomSheet: MatBottomSheet,
    private formBuilder :FormBuilder,
      private InventarioServiceSalida: InventarioSalidaService,
      private dialog:MatDialog,
      private activateRoute: ActivatedRoute
  //traer servicios
  ) {
    this.InventarioServiceSalida.selectAreas().subscribe((data) => {
      this.areas = data;
    });
    const correoSave = this.InventarioServiceSalida.getCorreo();
    this.formularioEditarInventarioSalida = this.formBuilder.group({
      nombreProducto: [''],
      peso: [''],
      fechaRegistro: [''],
      calibre: [''],
      idArea:[''],
      UsuarioActualizador:[correoSave]
    });
    this.activateRoute.paramMap.subscribe(params => {
      this.idProductosalida = params.get('id');

      this.InventarioServiceSalida.consultarInventarioSalida(this.idProductosalida).subscribe((respuesta=>{
        this.formularioEditarInventarioSalida.setValue({
          nombreProducto: respuesta.nombreProducto || '',
          peso: respuesta.peso,
          fechaRegistro: respuesta.fechaRegistro,
          calibre: respuesta.calibre,
          idArea: respuesta.idArea.toString(),
          UsuarioActualizador: respuesta.UsuarioActualizador || correoSave,

        });
      }))
    })
  }

  enviarDatosActualizar(){
    if (this.formularioEditarInventarioSalida.valid) {
      console.log('Formulario:', this.formularioEditarInventarioSalida.value);
      console.log('id rec', this.idProductosalida);
      console.log('Datos que se enviarán:', this.formularioEditarInventarioSalida.value);

     this.InventarioServiceSalida.editarproductoSalida(this.idProductosalida, this.formularioEditarInventarioSalida.value).subscribe(
    (response) => {
        console.log('Respuesta del servidor:', response);

        if (response.success === 1) {
            console.log('La actualización fue exitosa');
            // Accede a los datos actualizados
            const InventarioSActualiado = response.data;
            console.log('Datos del inventario actualizados:', InventarioSActualiado);

            this.mostratDialogoAviso();
        } else {
            console.error('Error al actualizar el inventario:', response.error);
            // Manejar errores del servicio aquí
        }
    },
    (error) => {
        console.error('Error al actualizar el inventario:', error);
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
        this.router.navigateByUrl('/dashboard/inventario/inventarioSalida');
      }
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

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetOverviewExampleSheet);
  }
  ngOnInit(): void {
    // Puedes realizar alguna inicialización adicional aquí si es necesario.

    this.InventarioServiceSalida.selectAreas().subscribe((data)=>{
      this.areas=data;
    })
  }
}


export class BottomSheetOverviewExampleSheet {
  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
}
}
