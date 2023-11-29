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
import { MatTableDataSource } from '@angular/material/table';

//paqueteria prueba
interface Area {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-inventario-edit',
  templateUrl: './inventario-edit.component.html',
  styleUrls: ['./inventario-edit.component.css'],
})
export class InventarioEditComponent implements OnInit{
  //valores prueba
  areas : any[];
  formularioEditarInventario:FormGroup;
  idproducto:any;



  constructor(private router:Router,
  private _bottomSheet: MatBottomSheet,
  private formBuilder :FormBuilder,
    private InventarioService: InventarioService,
    private dialog:MatDialog,
    private activateRoute: ActivatedRoute
//traer servicios

  ) {
    const correoSave = this.InventarioService.getCorreo();
    this.formularioEditarInventario = this.formBuilder.group({
      NombreInsumo: [''],
      Peso: [''],
      Fecha: [''],
      Dimension: [''],
      Composicion:[''],
      Calibre: [''],
      idArea:[''],
      UsuarioActualizador : [correoSave]
    });
    this.activateRoute.paramMap.subscribe(params => {
      this.idproducto = params.get('id');

      this.InventarioService.consultarInventario(this.idproducto).subscribe((respuesta=>{
        this.formularioEditarInventario.setValue({
          NombreInsumo: respuesta.NombreInsumo,
          Peso: respuesta.Peso,
          Fecha: respuesta.Fecha,
          Dimension:  respuesta.Dimension,
          Composicion: respuesta.Composicion,
          Calibre: respuesta.Calibre,
          idArea: respuesta.idArea.toString(),
          UsuarioActualizador: respuesta.UsuarioActualizador || correoSave,
        });
      }))
    })
  }

  enviarDatosActualizar(): void {
    if (this.formularioEditarInventario.valid)
    {
      console.log('Se presionó el botón');
      console.log(this.formularioEditarInventario.value);
      this.InventarioService.editarproducto(this.idproducto,this.formularioEditarInventario.value).subscribe(
        (response) => {
         console.log('Se actualizo correctamente: ', response);
         this.mostratDialogoAviso();


        },
        (error) => {
           //Manejar errores del servicio aquí
           console.error('Error al actualizar el gasto: ', error);
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
        this.router.navigateByUrl('/dashboard/inventario/inventarios');
      }
    });

  }

  Cancelar(){
    this.router.navigateByUrl('/dashboard/inventario/inventarios');
  }

  // openBottomSheet(): void {
  //   this._bottomSheet.open(BottomSheetOverviewExampleSheet);
  // }
  ngOnInit(): void {
    // Puedes realizar alguna inicialización adicional aquí si es necesario.
    console.log('AQUI ABAJO SE MOSTRARIA EL CORREO QUE SE TRAE DESDE EL LOCALSTORAGE');
    const correoSave = this.InventarioService.getCorreo();
    console.log('Correo desde el localStorage: ', correoSave);

    console.log('AQUI ABAJO SE MOSTRARIA EL NOMBRE QUE SE TRAE DESDE EL LOCALSTORAGE');
    const nombreSave = this.InventarioService.getNombre();
    console.log('Nombre desde el localStorage: ', nombreSave);

    // Puedes realizar alguna inicialización adicional aquí si es necesario.

    this.InventarioService.selectAreas().subscribe((data)=>{
      this.areas=data;
    })
  }
}


// export class BottomSheetOverviewExampleSheet {
//   constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>) {}

//   openLink(event: MouseEvent): void {
//     this._bottomSheetRef.dismiss();
//     event.preventDefault();
// }
// }

