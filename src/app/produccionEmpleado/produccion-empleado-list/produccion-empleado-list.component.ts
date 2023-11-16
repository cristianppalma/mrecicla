import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ProduccionEmpleadoService } from '../produccion-empleado.service';

// import { PeriodicElement } from '../PeriodicElement';

@Component({
  selector: 'app-produccion-empleado-list',
  templateUrl: './produccion-empleado-list.component.html',
  styleUrls: ['./produccion-empleado-list.component.css']
})
export class ProduccionEmpleadoListComponent {

  constructor(
    private router:Router,
  ) {}

  crearRegistro(){
    this.router.navigateByUrl('/dashboard/produccion-empleado/produccionEmpleadoCreate');
  }

}
