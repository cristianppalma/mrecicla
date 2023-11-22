import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { ProduccionEmpleadoService } from '../produccion-empleado.service';
import { PeriodicElement } from '../PeriodicElement';
// import { PeriodicElement } from '../PeriodicElement';

// export interface ProduccionEmpleado {
//   FechaInicio     :String;
//   FechaFin        :String;
//   HoraInicio      :String;
//   HoraFin         :String;
//   Turno           :String;
//   UnidadesInsumo  :String;
//   KgProduccion    :String;
// }

@Component({
  selector: 'app-produccion-empleado-list',
  templateUrl: './produccion-empleado-list.component.html',
  styleUrls: ['./produccion-empleado-list.component.css']
})
export class ProduccionEmpleadoListComponent implements OnInit {

  Produccion: PeriodicElement[] = [];
  displayedColumns: string[] = [
                                  //'idEmpleado',
                                  'idProduccionArea',
                                  'FechaInicio',
                                  'FechaFin',
                                  'HoraInicio',
                                  'HoraFin',
                                  // 'Turno',
                                  'productoInsumo',
                                  'UnidadesInsumo',
                                  'productoProduccion',
                                  'KgProduccion',
                                  // 'idMaquina',
                                  'action'];
  dataSource: MatTableDataSource<PeriodicElement>

  formatDateWithLeadingZeros(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  verDetalles(element: PeriodicElement) {
    // Implementa la lógica para mostrar los detalles del elemento seleccionado aquí
    console.log('Detalles de: ', element);
    console.log('ID: ', element.idProduccionArea);
    console.log('FECHA INICIO: ', element.FechaInicio);
    console.log('FECHA FIN: ', element.FechaFin);
    console.log('HORA INICIO: ', element.HoraInicio);
    console.log('HORA FIN: ', element.HoraFin);
    console.log('TURNO: ', element.Turno);
    console.log('UNIDADES INSUMOS: ', element.UnidadesInsumo);
    console.log('KG PRODUCCION: ', element.KgProduccion);

    // Puedes abrir un modal, mostrar información adicional, etc.
    const idProduccionArea = element.idProduccionArea; // Obtener el ID de la máquina
    this.router.navigateByUrl(`/dashboard/produccion-empleado/produccionEmpleadoDetails/${idProduccionArea}`);
  }

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
    this.dataSource = new MatTableDataSource<PeriodicElement>([]);
  }

  crearRegistro(){
    this.router.navigateByUrl('/dashboard/produccion-empleado/produccionEmpleadoCreate');
  }

  ngOnInit(): void {
    // TRAEMOS EL CORREO DESDE EL SERVICIO
    console.log('AQUI ABAJO SE MOSTRARIA EL CORREO QUE SE TRAE DESDE EL LOCALSTORAGE');
    const correoSave = this.produccionEmpleadoService.getCorreo();
    console.log('Correo desde el localStorage: ', correoSave);

    console.log('AQUI ABAJO SE MOSTRARIA EL NOMBRE QUE SE TRAE DESDE EL LOCALSTORAGE');
    const nombreSave = this.produccionEmpleadoService.getNombre();
    console.log('Nombre desde el localStorage: ', nombreSave);


    this.produccionEmpleadoService.listarProduccionArea().subscribe((respuesta: PeriodicElement[]) => {
      console.log(respuesta);
      console.log('Obtenemos todos los registros');

      this.Produccion = respuesta;
      this.dataSource.data = respuesta; // Actualiza el origen de datos con los resultados
    });

  }

}
