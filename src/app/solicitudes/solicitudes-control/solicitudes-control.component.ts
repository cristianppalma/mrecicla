import { Component, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export interface PeriodicElement {
  ver: string;
  position: number;
  status: string;
 fecha:string;
  area: string;
  action:string;
  
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, ver: 'Ver...', status: 'En aprovacion', fecha:Date().toLocaleString(),area:'telares',action:'Editar'},
  {position: 2, ver: 'Ver...', status: 'Entregado', fecha:Date().toLocaleString(),area:'telares',action:'Editar'},
  {position: 3, ver: 'Ver...', status: 'Cancelado', fecha:Date().toLocaleString(),area:'telares',action:'Editar'},
  {position: 4, ver: 'Ver...', status: 'Cancelado', fecha:Date().toLocaleString(),area:'telares',action:'Editar'},
  {position: 5, ver: 'Ver...', status: 'En aprovación', fecha:Date().toLocaleString(),area:'telares',action:'Editar'},
];

@Component({
  selector: 'app-solicitudes-control',
  templateUrl: './solicitudes-control.component.html',
  styleUrls: ['./solicitudes-control.component.css']
})
export class SolicitudesControlComponent{

displayedColumns: string[] = ['position', 'ver', 'status','fecha','area','action'];
dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);


@ViewChild(MatPaginator) paginator!: MatPaginator;

ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
}
constructor(private router:Router) {}

Solicitudes(){
  this.router.navigateByUrl('/dashboard/solicitudes/SolicitudesCrear');
}
SolicitudesEdit(){
  this.router.navigateByUrl('/dashboard/solicitudes/SolicitudesEdit');
}

Editar(element: PeriodicElement) {
  // Implementa la lógica para mostrar los detalles del elemento seleccionado aquí
  console.log('Detalles de:', element.ver);
  // Puedes abrir un modal, mostrar información adicional, etc.
}

}