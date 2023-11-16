import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { ProduccionEmpleadoService } from '../produccion-empleado.service';
import { Produccion } from '../produccion';
// import { PeriodicElement } from '../PeriodicElement';

export interface ProduccionEmpleado {
  FechaInicio     :String;
  FechaFin        :String;
  HoraInicio      :String;
  HoraFin         :String;
  Turno           :String;
  UnidadesInsumo  :String;
  KgProduccion    :String;
}

@Component({
  selector: 'app-produccion-empleado-list',
  templateUrl: './produccion-empleado-list.component.html',
  styleUrls: ['./produccion-empleado-list.component.css']
})
export class ProduccionEmpleadoListComponent implements OnInit {

  produccion: Produccion [] = [];
  displayedColumns: string[] = [  'idProduccionArea',
                                  'FechaInicio',
                                  'FechaFin',
                                  'HoraInicio',
                                  'HoraFin',
                                  // 'Turno',
                                  'UnidadesInsumo',
                                  'KgProduccion',
                                  // 'idMaquina',
                                  'action'];
  dataSource: MatTableDataSource<Produccion>

  // verDetalles(element: Produccion) {
  //   const id =element.idProduccionArea;
  //   // Implementa la lógica para mostrar los detalles del elemento seleccionado aquí
  //   console.log('Detalles de:');
  //   // Puedes abrir un modal, mostrar información adicional, etc.
  //   this.router.navigateByUrl(`/dashboard/produccion-empleado/produccionEmpleadoDetails/${id}`)
  // }


  constructor(
    private router:Router,
    private produccionEmpleadoService:ProduccionEmpleadoService
  ) {
    this.dataSource = new MatTableDataSource<Produccion>([]);
  }

  ngOnInit(): void {
    this.produccionEmpleadoService.listarProduccionArea().subscribe((respuesta: Produccion[]) => {
      console.log(respuesta);
      this.produccion = respuesta;
      this.dataSource.data = respuesta; // Actualiza el origen de datos con los resultados
    });
  }

  crearRegistro(){
    this.router.navigateByUrl('/dashboard/produccion-empleado/produccionEmpleadoCreate');
  }

}
