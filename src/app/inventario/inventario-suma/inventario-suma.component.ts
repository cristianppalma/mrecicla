import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
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
  public formularioEditarInventario: FormGroup;
  loading = false;
  //idInventarioFabrica:any;
  periodicElements: PeriodicElement[]=[];
  PeriodicElement !: PeriodicElement;
  idTemporal="";
  // p_ID:any;
  // cantidad:number;


  constructor(private router:Router,
      private _bottomSheet: MatBottomSheet,
      private formBuilder :FormBuilder,
        private InventarioService: InventarioService,
        private dialog:MatDialog,
        private activateRoute: ActivatedRoute,
    //traer servicios
     ) {



     }
     ngOnInit(): void {

      this.formularioEditarInventario= this.formBuilder.group({
        NombreInsumo: ['', [Validators.required]],
        Peso: ['',[Validators.required]],
        // cantidad: [0],
        Fecha: ['',[Validators.required]],
        Calibre: ['',[Validators.required]]
      });



     this.mostrarProductos();
    }

    formCantidad = new FormControl('', [
      Validators.required,
    ]);




    mostrarProductos(){
      // alert('valor consulta:');
      this.InventarioService.consultarDatosInventario().subscribe((res: any)=>{
        // console.log('respuesta de servicio'+res);
        if(res == 201){
          console.log('no se encontraron datos de inventario')
        }
        else{
          this.PeriodicElement = res[0].idInventarioFabrica;
           this.periodicElements = res;
        }
      },(err)=>{
          console.log('error de consulta',err);
        })

      }


      llenardatos(event:any){
        // alert(event.value);
        this.idTemporal=event.value;
        this.InventarioService.ConsultarInvent(event.value).subscribe((data:any)=>{
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

    enviarDatos(){
    const cantidadIngresada=this.formCantidad.value;
    // alert ('cantidad ingresada'+cantidadIngresada+'id Producto es:'+this.idTemporal);
    this.InventarioService.sumarAlInventario(this.idTemporal,cantidadIngresada).subscribe((data:any)=>{
      if(data == 1){

        // location.reload();
        const dialogAviso = this.dialog.open(AvisoDialogComponent,{
                data: {message: 'Se actualizo correctamente en la Base de Datos'}
              });
              dialogAviso.afterClosed().subscribe(result => {
                if (result) {
                  this.router.navigateByUrl('/dashboard/inventario/inventarios');
                }
              });
          
      }
      else{
        alert('error de actualizacion')
      }
    },(err)=>{
      console.log(err)})
    }

    Cancelar(){
          this.router.navigateByUrl('/dashboard/inventario/inventarios');
        }
}
