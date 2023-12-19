import { Component, OnInit, importProvidersFrom } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfirmationDialogComponent } from 'src/app/maquinas/confirmation-dialog/confirmation-dialog.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AvisoDialogComponent } from '../aviso-dialog/aviso-dialog.component'
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { listaEmpleado } from '../listaEmpleado';
import { EmpleadoService } from '../empleado.service';
import { PeriodicElement } from '../PeriodicElement';

import { ExporterService } from 'src/app/services/exporter.service';

// export interface Usuario {
//     Nombre: string;
//     ApellidoPaterno: string;
//     Correo: string;
//     ApellidoMaterno: String,
//     Turno: string;
//     Sueldo: number;
//     Area: string;
//     Puesto: string;
// }

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css'],
})
export class UsuarioTableComponent implements OnInit {
  puestos: any[];
  listaEmpleado: PeriodicElement[] = [];
  displayedColumns: string[] = [  'idUsuario',
                                  'Nombre',
                                  'ApellidoPaterno',
                                  'ApellidoMaterno',
                                  'Correo',
                                  'action'];
  dataSource: MatTableDataSource<PeriodicElement>

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
    console.log('ID: ', element.idUsuario);
    console.log('Nombre: ', element.Nombre);
    console.log('ApellidoPaterno: ', element.ApellidoPaterno);
    console.log('ApellidoMaterno: ', element.ApellidoMaterno);
    console.log('Correo: ', element.Correo);
    console.log('Pass: ', element.Pass);
    console.log('Practicante: ', element.Practicante);
    console.log('Sueldo: ', element.Sueldo);
    console.log('Turno: ', element.Turno);
    console.log('Domicilio: ', element.Domicilio);
    console.log('idTipoUsuario: ', element.idTipoUsuario);
    console.log('idAsignacion: ', element.idAsignacion);
    console.log('idArea: ', element.idArea);
    // Puedes abrir un modal, mostrar información adicional, etc.
    const idUsuario =element.idUsuario;
    this.router.navigateByUrl(`/dashboard/empleado/edditEmp/${idUsuario}`)
  }

  constructor(
    private router:Router,
    private dialog: MatDialog,
    private EmpleadoService:EmpleadoService,
    private excelService:ExporterService
    ) {
     this.dataSource = new MatTableDataSource<PeriodicElement>([]);
    }

    eliminarElemento(element: PeriodicElement): void {
      const correoSave = this.EmpleadoService.getCorreo();
      const index = this.dataSource.data.indexOf(element);
      const usuarioElimina=correoSave;
      if (index >= 0) {
        const idUsuario=element.idUsuario;
        this.dataSource.data.splice(index, 1);
        this.EmpleadoService.eliminarUsuario(idUsuario, usuarioElimina).subscribe();
        this.dataSource._updateChangeSubscription(); // Actualizar la vista de la tabla
        console.log(`Elemento eliminado en el índice ${index}, ID del usuario: ${idUsuario}`);
      }
    }

    mostrarDialogoDeConfirmacion(element: PeriodicElement): void {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: { message: '¿Estás seguro de que deseas eliminar este registro?' }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log('El elemanto va a ser eliminado ' + element.idUsuario);
          this.eliminarElemento(element);
        }
      });
    }

    ngOnInit(): void {
      this.EmpleadoService.listaEmpleado().subscribe((respuesta: PeriodicElement[]) => {
        console.log('LISTA DE LOS USUARIOS:');
        console.log(respuesta);
        this.listaEmpleado = respuesta;
        this.dataSource.data = respuesta; // Actualiza el origen de datos con los resultados
      });

      //OBTENER ID DE PUESTOS TABLA ASIGNACION
      this.EmpleadoService.SelectPuestos().subscribe((data)=>{
        this.puestos=data;
      })
    }

    //Exportar SIN filtros
  exportarXLSX(): void {
    this.excelService.exportToExcel(this.dataSource.data, 'reporte-usuarios');
  }

  //Exportar CON filtros
  exportarXLSXFilter(): void {
    this.excelService.exportToExcel(this.dataSource.filteredData, 'reporte-usuarios');
  }

    //OBTENEMOS EL NOMBRE DEL PUESTO A PARTIR DEL ID
    obtenerNombrePuesto(idAsignacion: number): string {
      const puesto = this.puestos.find(item => item.idAsignacion === idAsignacion);
      return puesto ? puesto.Puesto : '';
    }

    regresar (){
      this.router.navigateByUrl('/dashboard/tablero')
    }

  }
