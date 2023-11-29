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


@Component({
  selector: 'app-inventario-crear',
  templateUrl: './inventario-crear.component.html',
  styleUrls: ['./inventario-crear.component.css'],

  
})



export class InventarioCrearComponent implements OnInit{
  formularioProducto: FormGroup;

  areas:any[];

  constructor(private router:Router, 
    private _bottomSheet: MatBottomSheet,
    private formBuilder :FormBuilder,
    private InventarioService: InventarioService,
    private dialog:MatDialog
  ) {
    this.formularioProducto = this.formBuilder.group({
      //ID: ['', [Validators.required]],
      NombreInsumo: ['', [Validators.required]],
      Peso: ['', [Validators.required]],
      Dimension: ['', [Validators.required]],  
      Fecha: ['', [Validators.required]],
      Calibre: ['', [Validators.required]],
      areas: ['', [Validators.required]],
      Composicion:['', [Validators.required]],
      AreasDesignadas:['', [Validators.required]]
    });
  }
  
  Cancelar(){
    this.router.navigateByUrl('/dashboard/inventario/inventarios');
  }
    /**
    boton de abrir imagen
    */
  openBottomSheet(): void 
  {
    this._bottomSheet.open(BottomSheetOverviewExampleSheet);
  }
  

  enviarDatos(): void {
    if (this.formularioProducto.valid) 
    {
      console.log('Se presionó el botón');
      console.log(this.formularioProducto.value);
      this.InventarioService.agregarProducto(this.formularioProducto.value).subscribe(
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
        this.router.navigateByUrl('/dashboard/inventario/inventarios');
      }
    });
  
  }

  ngOnInit(): void {
    // Puedes realizar alguna inicialización adicional aquí si es necesario.

    this.InventarioService.selectAreas().subscribe((data)=>{
      this.areas=data;
    });
  }
}





@Component({
  selector: 'bottom-sheet-overview-example-sheet',
  templateUrl: 'inventario-opciones.component.html',
  standalone: true,
  imports: [MatListModule],
})
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
