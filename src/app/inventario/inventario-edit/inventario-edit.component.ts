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
  idInventarioFabrica:any;

   

  constructor(private router:Router, 
  private _bottomSheet: MatBottomSheet,
  private formBuilder :FormBuilder,
    private InventarioService: InventarioService,
    private dialog:MatDialog,
    private activateRoute: ActivatedRoute
//traer servicios
 
  ) {
    this.InventarioService.selectAreas().subscribe((data) => {
      this.areas = data;
    });
    const correoSave = this.InventarioService.getCorreo();
    this.formularioEditarInventario = this.formBuilder.group({
      NombreInsumo: [''],
      Peso: [''],
      Dimension: [''],  
      Fecha: [''],
      Calibre: [''],
      Composicion:[''],
      AreaDesignada:[''],
      UsuarioActualizador:[correoSave]
    });
    this.activateRoute.paramMap.subscribe(params => {
      this.idInventarioFabrica = params.get('id');

      this.InventarioService.consultarInventario(this.idInventarioFabrica).subscribe((respuesta=>{
        this.formularioEditarInventario.setValue({
          NombreInsumo: respuesta.NombreInsumo,
          Peso: respuesta.Peso,
          Dimension:  respuesta.Dimension,
          Fecha: respuesta.Fecha,
          Calibre: respuesta.Calibre,
          Composicion: respuesta.Composicion,
          AreaDesignada: respuesta.AreaDesignada.toString(),
          UsuarioActualizador: respuesta.UsuarioActualizador || correoSave

        });
      }))
    })
  }

  enviarDatos() {
    if (this.formularioEditarInventario.valid) {
      console.log('Formulario:', this.formularioEditarInventario.value);
      console.log('id rec', this.idInventarioFabrica);
      console.log('Datos que se enviarán:', this.formularioEditarInventario.value);

     this.InventarioService.editarproducto(this.idInventarioFabrica, this.formularioEditarInventario.value).subscribe(
    (response) => {
        console.log('Respuesta del servidor:', response);

        if (response.success === 1) {
            console.log('La actualización fue exitosa');
            // Accede a los datos actualizados
            const maquinaActualizada = response.data;
            console.log('Datos de la máquina actualizada:', maquinaActualizada);

            this.mostratDialogoAviso();
        } else {
            console.error('Error al actualizar la máquina:', response.error);
            // Manejar errores del servicio aquí
        }
    },
    (error) => {
        console.error('Error al actualizar la máquina con error:', error);
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

