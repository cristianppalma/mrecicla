import {Component, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  calibre: string;
  porcentaje: string;
 fecha:string;
  area: string;
  action:string;
  
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Borra', weight: 300, symbol: 'Pendiente',calibre:'No aplica',porcentaje:'Borra',fecha:Date().toLocaleString(),area:'telares',action:'Editar'},
  {position: 2, name: 'Hilo', weight: 200, symbol: 'Pendiente',calibre:'14',porcentaje:'80% algodon, 20% poliester',fecha:Date().toLocaleString(),area:'telares',action:'Editar'},
  {position: 3, name: 'Hilo', weight: 180, symbol: 'Pendiente',calibre:'24',porcentaje:'100% algodon',fecha:Date().toLocaleString(),area:'telares',action:'Editar'},
  {position: 4, name: 'Trapo', weight: 400, symbol: 'Pendiente',calibre:'No aplica',porcentaje:'',fecha:Date().toLocaleString(),area:'telares',action:'Editar'},
  {position: 5, name: 'Trapo', weight: 250, symbol: 'Pendiente',calibre:'No aplica',porcentaje:'',fecha:Date().toLocaleString(),area:'telares',action:'Editar'},
];
@Component({
  selector: 'app-inventario-control',
  templateUrl: './inventario-control.component.html',
  styleUrls: ['./inventario-control.component.css'],
})

export class InventarioControlComponent {

   displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','calibre','porcentaje','fecha','area','action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(private router:Router) {}

  inventario(){
    this.router.navigateByUrl('/dashboard/inventario/inventarioCrear');
  }
  inventarioEdit(){
    this.router.navigateByUrl('/dashboard/inventario/inventarioEdit');
  }
  
  Editar(element: PeriodicElement) {
    // Implementa la lógica para mostrar los detalles del elemento seleccionado aquí
    console.log('Detalles de:', element.name);
    // Puedes abrir un modal, mostrar información adicional, etc.
  }
  
}
