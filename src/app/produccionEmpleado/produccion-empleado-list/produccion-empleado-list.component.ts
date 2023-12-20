import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { ProduccionEmpleadoService } from '../produccion-empleado.service';
import { PeriodicElement } from '../PeriodicElement';

import { ExporterService } from 'src/app/services/exporter.service';

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

  inventariosSalida: any[];
  productosEntrada: any[]; //Obtenemos los datos de la tabla productos
  Produccion: PeriodicElement[] = [];
  displayedColumns: string[] = [
                                  //'idEmpleado',
                                  'idProduccionArea',
                                  'UsuarioCreadorNombre',
                                  'FechaInicio',
                                  'FechaFin',
                                  'HoraInicio',
                                  'HoraFin',
                                  //'NombreInsumo',
                                  // 'Turno',
                                  'idInventarioFabrica',
                                  'UnidadesInsumo',
                                  // 'productoProduccion',
                                  'idProductosalida',
                                  'KgProduccion',
                                  'Area',
                                  // 'idMaquina',
                                  'action' ];
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
    private produccionEmpleadoService:ProduccionEmpleadoService,
    private excelService:ExporterService
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

    console.log('AQUI ABAJO SE MOSTRARIA EL id QUE SE TRAE DESDE EL LOCALSTORAGE');
    const idUsuario = this.produccionEmpleadoService.getId();
    console.log('ID desde el localStorage: ', idUsuario);


    this.produccionEmpleadoService.listarProduccionArea(idUsuario).subscribe((respuesta: PeriodicElement[]) => {
      console.log(respuesta);
      console.log('Obtenemos todos los registros');

      this.Produccion = respuesta;
      this.dataSource.data = respuesta; // Actualiza el origen de datos con los resultados
    });


    //
    this.produccionEmpleadoService.selectInventarioSalida().subscribe((data)=>{
      this.inventariosSalida=data;
    });


    // Obtenemos los nombres de los registros de la tabla productos
    this.produccionEmpleadoService.selectProductoEntrada().subscribe((data)=>{
      this.productosEntrada=data;
    });


    // //
    // this.produccionEmpleadoService.selectUsuarios().subscribe((data)=>{
    //   this.inventariosSalida=data;
    // })

  }

  //Exportar SIN filtros
  exportarXLSX(): void {
    this.excelService.exportToExcel(this.dataSource.data, 'reporte-produccion-empleado');
  }

  //Exportar CON filtros
  exportarXLSXFilter(): void {
    this.excelService.exportToExcel(this.dataSource.filteredData, 'reporte-produccion-empleado');
  }

  obtenerNombreInsumo(idInventarioFabrica: number): string {
    const inventario = this.inventariosSalida.find(item => item.idInventarioFabrica === idInventarioFabrica);
    return inventario ? inventario.NombreInsumo : '';
  }

  // obtenerNombreUsuario(idUsuario: number): string {
  //   const nombreUser = this.inventariosSalida.find(item => item.idUsuario === idUsuario);
  //   return nombreUser ? nombreUser.Nombre : '';
  // }

  regresar (){
    this.router.navigateByUrl('/dashboard/tablero');
  }

}
