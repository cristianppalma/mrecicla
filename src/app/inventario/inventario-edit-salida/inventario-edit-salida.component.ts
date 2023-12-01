import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { InventarioService } from '../inventario.service';
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
      private InventarioService: InventarioService,
      private dialog:MatDialog,
      private activateRoute: ActivatedRoute
  //traer servicios
  ) {
    const correoSave = this.InventarioService.getCorreo();
    this.formularioEditarInventarioSalida = this.formBuilder.group({
      nombreProducto: [''],
      Peso: [''], 
      FechaRegistro: [''],
      Calibre: [''],
      idArea:[''],
      UsuarioActualizador:[correoSave]
    });
    this.activateRoute.paramMap.subscribe(params => {
      this.idProductosalida = params.get('id');

      this.InventarioService.consultarInventarioSalida(this.idProductosalida).subscribe((respuesta=>{
        this.formularioEditarInventarioSalida.setValue({
          nombreProducto: respuesta.nombreProducto,
          Peso: respuesta.Peso,
          FechaRegistro: respuesta.FechaRegistro,
          Calibre: respuesta.Calibre,
          idArea: respuesta.idArea.toString(),
          UsuarioActualizador: respuesta.UsuarioActualizador || correoSave

        });
      }))
    })
  }

  enviarDatosActualizar(): void {
    if (this.formularioEditarInventarioSalida.valid) 
    {
      console.log('Se presionó el botón');
      console.log(this.formularioEditarInventarioSalida.value);
      this.InventarioService.editarproductoSalida(this.idProductosalida,this.formularioEditarInventarioSalida.value).subscribe(
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
        this.router.navigateByUrl('/dashboard/inventario/inventarioSalida');
      }
    });
  
  }

  Cancelar(){
    this.router.navigateByUrl('/dashboard/inventario/inventarioSalida');
  }

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetOverviewExampleSheet);
  }
  ngOnInit(): void {
    // Puedes realizar alguna inicialización adicional aquí si es necesario.

    this.InventarioService.selectAreas().subscribe((data)=>{
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
