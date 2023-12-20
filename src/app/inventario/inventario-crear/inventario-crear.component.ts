import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventarioService } from '../inventario.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AvisoDialogComponent } from 'src/app/maquinas/aviso-dialog/aviso-dialog.component'
import { MatTableModule } from '@angular/material/table';import { MatTableDataSource } from '@angular/material/table';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { AvisoErrorComponent } from 'src/app/maquinas/aviso-error/aviso-error.component';


@Component({
  selector: 'app-inventario-crear',
  templateUrl: './inventario-crear.component.html',
  styleUrls: ['./inventario-crear.component.css'],


})



export class InventarioCrearComponent implements OnInit{
  formularioProducto: FormGroup;
  areas: any[] = [];
  productos:any[];

  constructor(private router:Router,
    private _bottomSheet: MatBottomSheet,
    private formBuilder :FormBuilder,
    private InventarioService: InventarioService,
    private dialog:MatDialog
  ) {
    const correSave = this.InventarioService.getCorreo();
    const idFabricaUsuario = this.InventarioService.getIdFabricaUsuario();
    this.formularioProducto = this.formBuilder.group({
      NombreInsumo: ['', [Validators.required]],
      Peso: ['', [Validators.required]],
      Dimension: ['', [Validators.required]],
      Fecha: ['', [Validators.required]],
      Calibre: ['', [Validators.required]],
      Composicion:['', [Validators.required]],
      idArea:['', [Validators.required]],
      UsuarioCreador:[correSave],
      idFabrica:[idFabricaUsuario],
    });
  }

  Cancelar(){
    this.router.navigateByUrl('/dashboard/inventario/inventarios');
  }
    /**
    boton de abrir imagen
    */
  // openBottomSheet(): void
  // {
  //   this._bottomSheet.open(BottomSheetOverviewExampleSheet);
  // }


  enviarDatos(): void {
    console.log('se preciona aqui ')
    if (this.formularioProducto.valid)
    {
      console.log('Se presionó el botón');
      console.log(this.formularioProducto.value);
      this.InventarioService.agregarProducto(this.formularioProducto.value).subscribe(
        (response) => {
          console.log('Respuesta del servidor: ', response);

          if (response.success === 1){
            console.log('Registro exitoso');
            this.mostratDialogoAviso();
          } else {
            console.error('Error al registrar en la Base de Datos: ', response.error);
            this.mostrarDialogError();
          }

        },
        (error) => {
           //Manejar errores del servicio aquí
           this.mostrarDialogError();
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
        this.router.navigateByUrl('/dashboard/inventario/inventarios');
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

    this.InventarioService.selectAreas().subscribe((data)=>{
      this.areas=data;
    });

    this.InventarioService.selectProductos().subscribe((data)=>{
      this.productos=data;
    });
  }
}





// @Component({
//   selector: 'bottom-sheet-overview-example-sheet',
//   templateUrl: 'inventario-opciones.component.html',
//   standalone: true,
//   imports: [MatListModule],
// })
// export class BottomSheetOverviewExampleSheet {
//   constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>) {}

//   openLink(event: MouseEvent): void {
//     this._bottomSheetRef.dismiss();
//     event.preventDefault();
//   }
// }
    /**
    boton de abrir imagen
    */
