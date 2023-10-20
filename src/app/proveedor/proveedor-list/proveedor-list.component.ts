import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

interface Food {
  value: string;
  viewValue: string;
}

export interface PeriodicElement {

  id: string;
  name: string;
  product: string;
  action: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { id: '001', name: 'Jorge Cervantes Garcia', product: 'Hilo importado', action: 'Ver detalles' },
  { id: '002', name: 'Mariano Gonzalez Cuellar', product: 'Poliester', action: 'Ver detalles' },
  { id: '003', name: 'Fernando Morales Padilla', product: 'Borra', action: 'Ver detalles' },
  { id: '004', name: 'Mario Martinez Saldaña', product:'Tela reciclada', action: 'Ver detalles'}
  // ... otros datos
];

@Component({
  selector: 'app-proveedor-list',
  templateUrl: './proveedor-list.component.html',
  styleUrls: ['./proveedor-list.component.css']
})
export class ProveedorListComponent {

  formatDateWithLeadingZeros(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  foods: Food[] = [
    {value:'',viewValue:''},
    {value: 'Hilo importado', viewValue: 'Hilo importado'},
    {value: 'Tela reciclada', viewValue: 'Tela reciclada'},
    {value: 'Borra', viewValue: 'Borra'},
  ];
  displayedColumns: string[] = ['id', 'name', 'product', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  verDetalles(element: PeriodicElement) {
    // Implementa la lógica para mostrar los detalles del elemento seleccionado aquí
    console.log('Detalles de:', element.name);
    // Puedes abrir un modal, mostrar información adicional, etc.
  }

  constructor(private router:Router) {}

  crearProveedor(){
    this.router.navigateByUrl('/dashboard/proveedor/proveedorCreate');
  }

  editarProveedor(){
    this.router.navigateByUrl('/dashboard/proveedor/proveedorEdit/:id');
  }

}
