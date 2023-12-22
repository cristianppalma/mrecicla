import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/maquinas/confirmation-dialog/confirmation-dialog.component'
import { ControlService } from '../control.service';
import { PeriodicElement } from '../PeriodicElement';

import { ExporterService } from 'src/app/services/exporter.service';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-control-gastos-generales',
  templateUrl: './control-gastos-generales.component.html',
  styleUrls: ['./control-gastos-generales.component.css']
})

export class ControlGastosGeneralesComponent  implements OnInit {

  usuarioTienePermisoSuper: boolean;
  usuarioSupervisor:boolean;


  Gastos: PeriodicElement[] = [];
  // displayedColumns: string[] = ['idControl','Concepto', 'Descripcion', 'Periodo', 'UsuarioCreador','FechaCreacion','UsuarioActualizar', 'FechaActualizacion', 'Monto','Tipo','action'];
  displayedColumns: string[];
  dataSource: MatTableDataSource<PeriodicElement>;

  formatDateWithLeadingZeros(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  foods: Food[] = [
    {value:'',viewValue:''},
    {value: 'Hilos', viewValue: 'Hilos'},
    {value: 'Telar', viewValue: 'Telar'},
    {value: 'Bordado', viewValue: 'Bordado'},
  ];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  verDetalles(element: PeriodicElement) {
    // Implementa la lógica para mostrar los detalles del elemento seleccionado aquí
    console.log('Detalles de:', element);
    const idGastosFabrica = element.idGastosFabrica;
    // Puedes abrir un modal, mostrar información adicional, etc.
    this.router.navigateByUrl(`/dashboard/control/controlGastosGeneralesEditar/${idGastosFabrica}`);
  }

  constructor(
    private router:Router,
    private dialog: MatDialog,
    private ControlService:ControlService,
    private excelService:ExporterService
  ) {
      this.dataSource = new MatTableDataSource<PeriodicElement>([]);

      const nombreUsuarioTipo = this.ControlService.getTipoUsuario();
      this.usuarioTienePermisoSuper = this.verificarPermisosDelUsuarioSuper();
      this.usuarioSupervisor = this.verificarPuestoUser();

      if (nombreUsuarioTipo === "SuperAdministrador") {
        this.displayedColumns =  [
          'idGastosFabrica',
          'Concepto',
          'Descripcion',
          'Periodo',
          'Monto',
          'Tipo',
          'UsuarioCreador',
          'FechaCreacion',
          'UsuarioActualizador',
          'FechaActualizacion',
          'Empresa',
          'action'
        ];
      } else {
        this.displayedColumns =  [
          'idGastosFabrica',
          'Concepto',
          'Descripcion',
          'Periodo',
          'Monto',
          'Tipo',
          'UsuarioCreador',
          'FechaCreacion',
          'UsuarioActualizador',
          'FechaActualizacion',
          'action'
        ];
      }
    }

    private verificarPermisosDelUsuarioSuper(): boolean {
      const nombreUsuario = localStorage.getItem("NombreTipoUser");
      // Realiza la lógica para determinar si el usuario tiene permiso basado en su rol
      return ( (nombreUsuario === "SuperAdministrador")); // Ejemplo: el usuario con rol "admin" tiene permiso
    }

    private verificarPuestoUser(): boolean{
    
      const puesto = localStorage.getItem("Puesto");
      // Realiza la lógica para determinar si el usuario tiene permiso basado en su rol
      return ((puesto === "Encargado de Área") ); 
    }
  CrearGastosGenerales(){
    this.router.navigateByUrl('/dashboard/control/controlGastosGeneralesCrear');
  }

  eliminarElemento(element: PeriodicElement): void {
    const index = this.dataSource.data.indexOf(element);

    if (index >= 0) {
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription(); // Actualizar la vista de la tabla
    }
  }

  eliminarElemento2(element: PeriodicElement): void{
    const correoSave = this.ControlService.getCorreo();
    const index = this.dataSource.data.indexOf (element);
    const usuarioElimina=correoSave;
    if(index >=0){
      const idControl = element.idGastosFabrica;
      this.dataSource.data.splice(index,1);
      this.ControlService.eliminargasto(idControl, usuarioElimina).subscribe();
      this.dataSource._updateChangeSubscription();
      console.log(`Elemento eliminado en el índice ${index}, ID de la gasto: ${idControl}`);
    }
  }

  mostrarDialogoDeConfirmacion(element: PeriodicElement): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    data: { message: '¿Estás seguro de que deseas eliminar este registro?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminarElemento(element);
      }
    });
  }

  mostrarDialogDeConfirmacion2(element: PeriodicElement): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    data: { message: '¿Estás seguro de que deseas eliminar este registro?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminarElemento2(element);
      }
    });
  }

  ngOnInit(): void {

    //asi estaba antes de meter el puesto 
   /*this.ControlService.listarGastos().subscribe((respuesta: PeriodicElement[]) => {
    console.log(respuesta);
    this.Gastos = respuesta;
    this.dataSource.data = respuesta; // Actualiza el origen de datos con los resultados
    });

    const idArea= localStorage.getItem("idArea");
    this.ControlService.listarGastosporArea(idArea).subscribe((respuesta:PeriodicElement[])=>{
      console.log(respuesta);
      this.Gastos = respuesta;
      this.dataSource.data = respuesta; // Actualiza el origen de datos con los resultados
    })*/
    const nombreUsuarioTipo = this.ControlService.getTipoUsuario();
    const puesto=localStorage.getItem("Puesto");
    if (nombreUsuarioTipo === "SuperAdministrador" || nombreUsuarioTipo === "Administrador") {
      // Lógica para SuperAdministrador
      this.ControlService.listarGastos().subscribe((respuesta: PeriodicElement[]) => {
        console.log(respuesta);
        this.Gastos = respuesta;
        this.dataSource.data = respuesta; // Actualiza el origen de datos con los resultados
      });
    } else if (puesto === "Encargado de Área") {
      // Lógica para Encargado de Área
      const idArea = localStorage.getItem("idArea");
      this.ControlService.listarGastosporArea(idArea).subscribe((respuesta: PeriodicElement[]) => {
        console.log(respuesta);
        this.Gastos = respuesta;
        this.dataSource.data = respuesta; // Actualiza el origen de datos con los resultados
      })

    
  }
  }
  //Exportar SIN filtros
  exportarXLSX(): void {
    this.excelService.exportToExcel(this.dataSource.data, 'reporte-control-de-gastos');
  }

  //Exportar CON filtros
  exportarXLSXFilter(): void {
    this.excelService.exportToExcel(this.dataSource.filteredData, 'reporte-control-de-gastos');
  }

  RegresarGastosGenerales(){
    this.router.navigateByUrl('/dashboard/control/controlGastos');
  }

  regresar (){
    this.router.navigateByUrl('/dashboard/tablero');
  }
}
