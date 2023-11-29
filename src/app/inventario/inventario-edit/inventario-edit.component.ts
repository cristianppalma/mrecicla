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
  areas : any[]=[];
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
    this.formularioEditarInventario = this.formBuilder.group({
      NombreInsumo: [''],
      Peso: [''],
      Dimension: [''],  
      Fecha: [''],
      Calibre: [''],
      Composicion:[''],
      idArea:['']
    });
    this.activateRoute.paramMap.subscribe(params => {
      this.idproducto = params.get('id');

      this.InventarioService.consultarInventario(this.idproducto).subscribe((respuesta=>{
        this.formularioEditarInventario.setValue({
          nombreInsumo: respuesta.NombreInsumo,
          Peso: respuesta.Peso,
          Dimension:  respuesta.Dimension,
          Fecha: respuesta.Fecha,
          Calibre: respuesta.Calibre,
          Composicion: respuesta.Composicion,
          areas: respuesta.AreaDesignada.toString()
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
        this.router.navigateByUrl('/dashboard/inventario/inventarios');
      }
    });
  
  }

  Cancelar(){
    this.router.navigateByUrl('/dashboard/inventario/inventarios');
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

