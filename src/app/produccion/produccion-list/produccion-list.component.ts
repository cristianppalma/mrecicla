import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

import { ProduccionEmpleadoService } from 'src/app/produccionEmpleado/produccion-empleado.service';
import { PeriodicElement } from 'src/app/produccionEmpleado/PeriodicElement';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { startWith, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { ExporterService } from 'src/app/services/exporter.service';

@Component({
  selector: 'app-produccion-list',
  templateUrl: './produccion-list.component.html',
  styleUrls: ['./produccion-list.component.css']
})

export class ProduccionListComponent implements OnInit {

  areas: any[] = [];
  inventariosSalida: any[];
  productosEntrada: any[]; //Obtenemos los datos de la tabla productos
  Produccion: PeriodicElement[] = [];
  displayedColumns: string[] = [
                                  'idProduccionArea',
                                  'UsuarioCreadorNombre',
                                  'FechaInicio',
                                  // 'FechaFin',
                                  'HoraInicio',
                                  'HoraFin',
                                  'idInventarioFabrica',
                                  'UnidadesInsumo',
                                  'idProductosalida',
                                  'KgProduccion',
                                  'Area',
                                  'action' ];
  dataSource: MatTableDataSource<PeriodicElement>;
  filterForm: FormGroup;  // Declara un FormGroup

  constructor(
    private router:Router,
    private produccionEmpleadoService:ProduccionEmpleadoService,
    private fb: FormBuilder,
    private excelService:ExporterService
    ) {
      this.dataSource = new MatTableDataSource<PeriodicElement>([]);
      this.filterForm = this.fb.group({
        Area: ['']
      });

    }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  filtrarPorArea() {
    console.log('entro');
    if (this.filterForm && this.filterForm.get('Area')) {
      console.log('segundo nivel');
      const areaControl = this.filterForm.get('Area');
      if (areaControl) {
        console.log('tercer nivel');
        const areaValue = areaControl.value;

        if (areaValue && areaValue !== '0') {
          this.dataSource.filter = areaValue.toString();
        } else {
          // Si el valor es '0' o nulo, quitar el filtro
          this.dataSource.filter = '';
        }

      }
    }
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
     
     const idArea = this.produccionEmpleadoService.getidArea();

     //Obtenemos los nombres del inventarioFabrica
     this.produccionEmpleadoService.selectInventarioSalida().subscribe((data) => {
      this.inventariosSalida=data;
     });


     // Obtenemos los nombres de los registros de la tabla productos
    this.produccionEmpleadoService.selectProductoEntrada().subscribe((data)=>{
      this.productosEntrada=data;
    });

    this.produccionEmpleadoService.selectAreas().subscribe((data) => {
      this.areas = data;
    });

     this.produccionEmpleadoService.listarProduccionGeneral().subscribe((respuesta: PeriodicElement[]) => {
        console.log(respuesta);
        console.log('Obtenemos todos los registros generales');
        this.Produccion = respuesta;
        this.dataSource.data = respuesta;
     })

  }

  //Exportar SIN filtros
  exportarXLSX(): void {
    this.excelService.exportToExcel(this.dataSource.data, 'reporte-produccion-general');
  }

  //Exportar CON filtros
  exportarXLSXFilter(): void {
    this.excelService.exportToExcel(this.dataSource.filteredData, 'reporte-produccion-general');
  }

  //Funcion para obtener nombre de inventarioFabrica en lugar de solo el id
  obtenerNombreInsumo(idInventarioFabrica: number): string {
    const inventario = this.inventariosSalida.find(item => item.idInventarioFabrica === idInventarioFabrica);
    return inventario ? inventario.NombreInsumo : '';
  }

  // obtenerNombreUsuario(idUsuario: number): string {
  //   const nombreUser = this.inventariosSalida.find(item => item.idUsuario === idUsuario);
  //   return nombreUser ? nombreUser.Nombre : '';
  // }

  //Funcion para ir a la vista produccionCreate
  crearProduccion (){
    this.router.navigateByUrl('/dashboard/produccion/produccionCreate');
  }

  //Funcion para ir a la pagina anterior
  regresar (){
    this.router.navigateByUrl('/dashboard/tablero');
  }

  //Funcion para ir a la vista produccion de la grafica
  grafica() {
    this.router.navigateByUrl('/dashboard/produccion/produccion');
  }
}
