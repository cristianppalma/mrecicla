import { Component,OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { PeriodicElement } from '../PeriodicElement';
import { MatDialog } from '@angular/material/dialog';
import { InventarioService } from '../inventario.service';
import { InventarioSalidaService } from '../inventario-salida.service';
import { ConfirmationDialogComponent } from 'src/app/maquinas/confirmation-dialog/confirmation-dialog.component';
import { PeriodicElement2 } from '../PeriodicElement2';

interface Food {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-inventario-control-salida',
  templateUrl: './inventario-control-salida.component.html',
  styleUrls: ['./inventario-control-salida.component.css']
})
export class InventarioControlSalidaComponent implements OnInit {
  areas : any[]=[];
  Producto:PeriodicElement2[] = [];
  displayedColumns:string[] = ['idProductosalida','nombreProducto','peso','fechaRegistro','calibre','idArea','action']
  dataSource: MatTableDataSource<PeriodicElement2>;

  formatDateWithLeadingZeros(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
  foods: Food[] = [
    {value:'',viewValue:''},
    {value: 'Hilos', viewValue: 'Hilos'},
    {value: 'Telar', viewValue: 'Telar'},
    {value: 'Bordado', viewValue: 'Bordado'},
  ];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  verDetalles(element: PeriodicElement2) {
    // Implementa la lógica para mostrar los detalles del elemento seleccionado aquí
    console.log('Detalles de:');
    const idProductosalida = element.idProductosalida;
    // Puedes abrir un modal, mostrar información adicional, etc.
    this.router.navigateByUrl(`/dashboard/inventario/inventarioEditSalida/${idProductosalida}`)
  }

  constructor(private router:Router,
    private dialog:MatDialog,
    private InventarioServiceSalida:InventarioSalidaService

    ) {
      this.dataSource=new MatTableDataSource<PeriodicElement2>([]);
    }
    inventario(){
      this.router.navigateByUrl('/dashboard/inventario/inventarioCrear');
    }
    inventarioSalida(){
      this.router.navigateByUrl('/dashboard/inventario/inventarioSalida');
    }
    inventarioEntrada(){
      this.router.navigateByUrl('/dashboard/inventario/inventarios');
    }

    agregarInventarioSalida(){
      this.router.navigateByUrl('/dashboard/inventario/suma-a-inventario-salida');
    }


    borrarInventarioSalida2(element:PeriodicElement2): void{
      const correoSave = this.InventarioServiceSalida.getCorreo();
      const index =this.dataSource.data.indexOf(element);
      const usuarioElimina=correoSave;
      if(index >=0){
        const idProductosalida = element.idProductosalida;
        this.dataSource.data.splice(index,1);
        this.InventarioServiceSalida.borrarInventarioSalida(idProductosalida,usuarioElimina).subscribe();
        this.dataSource._updateChangeSubscription();

         // Aquí tienes tanto el índice como el idMaquina
      console.log(`Elemento eliminado en el índice ${index}, ID del producto: ${idProductosalida}`);
      }
    }

    mostrarDialogoDeConfirmacion2(element: PeriodicElement2): void {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: { message: '¿Estás seguro de que deseas eliminar este registro?' }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.borrarInventarioSalida2(element);
        }
      });
    }

  ngOnInit(): void {
    this.InventarioServiceSalida.listarInventariosalida().subscribe((respuesta: PeriodicElement2[]) => {
      console.log('LISTA DE PRODUCTOS: ', respuesta);
      this.Producto = respuesta;
      this.dataSource.data = respuesta; // Actualiza el origen de datos con los resultados
    });

    this.InventarioServiceSalida.selectAreas().subscribe((data)=>{
      this.areas=data;
    })

  }


obtenerNombreArea(idArea: number): string {
    const area = this.areas.find(item => item.idArea === idArea);
    return area ? area.NombreArea : '';
  }

  regresar (){
    this.router.navigateByUrl('/dashboard/tablero');
  }


}
