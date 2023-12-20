import { Component, OnInit, SimpleChanges } from '@angular/core';
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
import { producto } from '../producto';

@Component({
  selector: 'app-inventario-suma',
  templateUrl: './inventario-suma.component.html',
  styleUrls: ['./inventario-suma.component.css']
})
export class InventarioSumaComponent implements OnInit{
  //valores prueba
  areas : any[]=[];
  productos : any[]=[];
  formularioEditarInventario:FormGroup;
  idInventarioFabrica:any;
  p_ID:any;
  p_cantidad:number=0;
  productoIds: number[] = [];


  constructor(private router:Router,
  private _bottomSheet: MatBottomSheet,
  private formBuilder :FormBuilder,
    private InventarioService: InventarioService,
    private dialog:MatDialog,
    private activateRoute: ActivatedRoute,
//traer servicios
 ) {
    this.InventarioService.selectAreas().subscribe((data) => {
      this.areas = data;
    });
    const correoSave = this.InventarioService.getCorreo();
    this.formularioEditarInventario = this.formBuilder.group({
      NombreInsumo: [],
      Peso: [],
      p_cantidad: [],
      Dimension: [],
      Fecha: [],
      Calibre: [],
      Composicion:[],
      AreaDesignada:[],
      UsuarioActualizador:[correoSave]
    });
    this.activateRoute.paramMap.subscribe(params => {
      this.idInventarioFabrica = params.get('id');

      this.InventarioService.consultarInventario(this.idInventarioFabrica).subscribe((respuesta=>{
        this.formularioEditarInventario.setValue({
          NombreInsumo: respuesta.NombreInsumo,
          Peso: respuesta.Peso ||'',
          p_cantidad: respuesta.p_cantidad ||'',
          Dimension:  respuesta.Dimension ||'',
          Fecha: respuesta.Fecha ||'',
          Calibre: respuesta.Calibre ||'',
          Composicion: respuesta.Composicion ||'',
          AreaDesignada: respuesta.AreaDesignada !== undefined ? respuesta.AreaDesignada.toString() : '',
          UsuarioActualizador: respuesta.UsuarioActualizador || correoSave
        });
      }))
    })

  }
//selectProductos


validateDataInventory(idInventario:any ){
  //localStorage.setItem('idInventarioFabrica', idInventario.value);
  let idInventarioGen = idInventario.value;
  localStorage.setItem("id_inventarioGral", idInventarioGen );
  //alert("idInventario"+idInventario.value)
  this.InventarioService.ConsultarInvent(idInventario.value).subscribe((data:any)=>{
    if(data !== 201){
      console.log(data);
      data.forEach((element:any) => {
        console.log(element.Peso)
        console.log(element.Fecha)
       // let varPeso= this.formularioEditarInventario.value.Peso=element.Peso
        this.formularioEditarInventario=this.formBuilder.group({
          Peso:[element.Peso],
          Fecha:[element.Fecha],
          Calibre:[element.Calibre]
        })
      });
      //let Peso=this.formularioEditarInventario.value.Peso='2';
    }
  },(err)=>{
    console.log(err)
  })
}

enviarDatos() {
  if (this.p_ID && this.p_cantidad > 0) {
    this.InventarioService.sumarAlInventario(this.p_ID, this.p_cantidad).subscribe(
      response => {
        console.log(response);
        // Realizar acciones adicionales si es necesario
      },
      error => {
        console.error(error);
        // Manejar errores si es necesario
      }
    );
  } else {
    console.log('Por favor, ingresa un producto y un peso válido.');
  }
}
 /*   enviarDatos() {
    if (this.formularioEditarInventario.valid) {
      console.log('Formulario:', this.formularioEditarInventario.value);
      console.log('id rec', this.idInventarioFabrica);
      console.log('Datos que se enviarán:', this.formularioEditarInventario.value);
      let Pesoinv = this.formularioEditarInventario.value.Peso;
      console.log('Peso'+Pesoinv+'idInventario'+this.idInventarioFabrica);
      let getidInventario = localStorage.getItem("id_inventarioGral");
      console.log('getidInventario'+getidInventario);
      this.InventarioService.actualizarPesoInv(Pesoinv,getidInventario).subscribe((data:any)=>{
        if(data='1'){
          alert('se actualizo correctamente');
          location.reload();
        }
        else{
          alert('error al actualizar');
        }
      })
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

  }*/

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
    });

    this.InventarioService.selectProductos().subscribe((data)=>{
      this.productos=data;
    });

    this.InventarioService.getProductIds().subscribe((data) => {
      this.productoIds = data;
    });

  }
//onProductoChange
}



export class BottomSheetOverviewExampleSheet {
  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
}
}
