import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { ProduccionEmpleadoService } from 'src/app/produccionEmpleado/produccion-empleado.service';
import { PeriodicElement } from 'src/app/produccionEmpleado/PeriodicElement';
import { FormGroup, FormBuilder } from '@angular/forms';
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
        FechaInicio: [''],
        FechaFin: [''],
        Area: [''],
      });
    }

  filtrarPorAreaYFechas() {
    // Filtro por área
    const areaControl = this.filterForm.get('Area');
    const areaValue = areaControl ? areaControl.value : null;

    // Filtro por fechas
    const fechaInicioValue = this.filterForm.get('FechaInicio')?.value;
    const fechaFinValue = this.filterForm.get('FechaFin')?.value;

    // Llamada al servicio solo si hay al menos un filtro activo
    if (areaValue!=='0' || fechaInicioValue!=='' || fechaFinValue!=='') {
      this.produccionEmpleadoService.listarProduccionGeneral().subscribe((respuesta: PeriodicElement[]) => {
        const buscarRegistros = respuesta.filter(n =>
          (!areaValue || n.Area == areaValue) &&
          (!fechaInicioValue || (n.FechaInicio && n.FechaInicio >= fechaInicioValue)) &&
          (!fechaFinValue || (n.FechaInicio && n.FechaInicio <= fechaFinValue))
        );

        this.dataSource.data = buscarRegistros;

        console.log('REGISTROS ENTRE LOS RANGOS ENCONTRADOS: ', buscarRegistros);
      });
    } else {
      // Si no hay filtros activos, restablece la tabla a su estado original
      this.dataSource.data = this.dataSource.data;
    }
  }

  limpiarFiltro(){
    // Reinicia los valores de los campos de los filtros
    this.filterForm.get('FechaInicio')?.setValue('');
    this.filterForm.get('FechaFin')?.setValue('');
    this.filterForm.get('Area')?.setValue('');

    // Vuelve a cargar los datos originales en la tabla
    this.produccionEmpleadoService.listarProduccionGeneral().subscribe((respuesta: PeriodicElement[]) => {
      this.Produccion = respuesta;
      this.dataSource.data = respuesta;
    });
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
     const correoSave = this.produccionEmpleadoService.getCorreo();
     console.log('Correo desde el localStorage: ', correoSave);

     const nombreSave = this.produccionEmpleadoService.getNombre();
     console.log('Nombre desde el localStorage: ', nombreSave);

     const idEmpleado = this.produccionEmpleadoService.getId();
     console.log('ID desde el localStorage: ', idEmpleado);

     //Obtenemos los nombres del inventarioFabrica
     this.produccionEmpleadoService.selectInventarioSalida().subscribe((data) => {
      this.inventariosSalida=data;
     });

     // Obtenemos los nombres de los registros de la tabla productos
     this.produccionEmpleadoService.selectProductoEntrada().subscribe((data)=>{
      this.productosEntrada=data;
     });

     // Obtenemos los nombres de las areas
     this.produccionEmpleadoService.selectAreas().subscribe((data) => {
      this.areas = data;
     });

     // Obtenemos toda la lista de Produccion general
     this.produccionEmpleadoService.listarProduccionGeneral().subscribe((respuesta: PeriodicElement[]) => {
        console.log(respuesta);
        console.log('Obtenemos todos los registros generales');
        this.Produccion = respuesta;
        this.dataSource.data = respuesta;
     });

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
