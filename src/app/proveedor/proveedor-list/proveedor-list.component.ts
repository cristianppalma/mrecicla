import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProveedorService } from '../proveedor.service';

import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';


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
export class ProveedorListComponent implements OnInit {

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
    console.log(this.dataSource);

  }


  verDetalles(element: PeriodicElement) {
    // Implementa la lógica para mostrar los detalles del elemento seleccionado aquí
    console.log('Detalles de:', element.name);
    // Puedes abrir un modal, mostrar información adicional, etc.
  }

  Proveedores:any;

  constructor(
    private router:Router,
    private proveedorService:ProveedorService,
    public modal:MatDialog
  ) {}

  ngOnInit(): void {
    this.proveedorService.obtenerProveedores().subscribe(respuesta=>{
      console.log(respuesta);

      this.Proveedores=respuesta;
    });
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string){
    this.modal.open(ModalDeleteComponent,{
      width: '550px',
      height: '330px',
      enterAnimationDuration,
      exitAnimationDuration,
    })
  }

  borrarRegistro(id:any, iControl:any){
    console.log(id);
    console.log(iControl);

    if(window.confirm("¿Desea borrar el registro?")) {
      this.proveedorService.borrarProveedor(id).subscribe((respuesta)=>{
        this.Proveedores.splice(iControl,1);
      });
    }
  }

  crearProveedor(){
    this.router.navigateByUrl('/dashboard/proveedor/proveedorCreate');
  }

  editarProveedor(){
    this.router.navigateByUrl('/dashboard/proveedor/proveedorEdit/:id');
  }

}
