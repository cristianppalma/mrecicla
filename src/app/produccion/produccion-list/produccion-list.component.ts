import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

import { ProduccionEmpleadoService } from 'src/app/produccionEmpleado/produccion-empleado.service';
import { PeriodicElement } from 'src/app/produccionEmpleado/PeriodicElement';

@Component({
  selector: 'app-produccion-list',
  templateUrl: './produccion-list.component.html',
  styleUrls: ['./produccion-list.component.css']
})

export class ProduccionListComponent implements OnInit {

  inventariosSalida: any[];
  Produccion: PeriodicElement[] = [];
  displayedColumns: string[] = [
                                  'idProduccionArea',
                                  'FechaInicio',
                                  'FechaFin',
                                  'HoraInicio',
                                  'HoraFin',
                                  'idInventarioFabrica',
                                  'UnidadesInsumo',
                                  'KgProduccion',
                                  'action' ];
  dataSource: MatTableDataSource<PeriodicElement>;

  formatDateWithLeadingZeros(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
    const idProduccionArea = element.idProduccionArea; // Obtener el ID del registro de ProduccionArea
    this.router.navigateByUrl(`/dashboard/produccion-empleado/produccionEmpleadoDetails/${idProduccionArea}`);
  }

  constructor(
    private router:Router,
    private produccionEmpleadoService:ProduccionEmpleadoService,
    ) {
      this.dataSource = new MatTableDataSource<PeriodicElement>([]);
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
     const idEmpleado = this.produccionEmpleadoService.getId();
     console.log('ID desde el localStorage: ', idEmpleado);

     this.produccionEmpleadoService.listarProduccionGeneral().subscribe((respuesta: PeriodicElement[]) => {
        console.log(respuesta);
        console.log('Obtenemos todos los registros generales');
        this.Produccion = respuesta;
        this.dataSource.data = respuesta;
     })

     //Obtenemos los nombres del inventarioFabrica
     this.produccionEmpleadoService.selectInventarioSalida().subscribe((data) => {
      this.inventariosSalida=data;
     })

  }

  //Funcion para obtener nombre de inventarioFabrica en lugar de solo el id
  obtenerNombreInsumo(idInventarioFabrica: number): string {
    const inventario = this.inventariosSalida.find(item => item.idInventarioFabrica === idInventarioFabrica);
    return inventario ? inventario.NombreInsumo : '';
  }

  //Funcion para ir a la vista produccionCreate
  crearProduccion (){
    this.router.navigateByUrl('/dashboard/produccion/produccionCreate');
  }

  //Funcion para ir a la pagina anterior
  regresarProduccion (){
    if (window.history.length > 1) {
      // Si hay más de una página en el historial, regresa a la página anterior
      window.history.back();
  } else {
      // Si no hay más páginas en el historial, puedes redirigir a una página específica
      // o realizar alguna otra acción en su lugar.
      console.warn('No hay páginas anteriores en el historial.');
      // Puedes redirigir a otra página o realizar otra acción aquí
  }
  }

  //Funcion para ir a la vista produccion de la grafica
  grafica() {
    this.router.navigateByUrl('/dashboard/produccion/produccion');
  }
}
