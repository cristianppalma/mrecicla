import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfirmationDialogComponent } from 'src/app/maquinas/confirmation-dialog/confirmation-dialog.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AvisoDialogComponent } from '../aviso-dialog/aviso-dialog.component'
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import {listaEmpleado} from '../listaEmpleado';
import { EmpleadoService } from '../empleado.service';

export interface Usuario {
    Nombre: string; 
    ApellidoPaterno: string;
    Correo: string;
    ApellidoMaterno: String,  
    Turno: string;
    Sueldo: number; 
    Area: string; 
    Puesto: string;
}

@Component({
  selector: 'app-lista-empleados',
  templateUrl: './lista-empleados.component.html',
  styleUrls: ['./lista-empleados.component.css'],
})
export class UsuarioTableComponent implements OnInit {
  listaEmpleado: listaEmpleado [] = [];
  displayedColumns: string[] = [  'idUsuario', 
                                  'Nombre', 
                                  'ApellidoPaterno',
                                  'ApellidoMaterno',
                                  'Correo',
                                  'Puesto',
                                  'action'];
  dataSource: MatTableDataSource<listaEmpleado>

  verDetalles(element: listaEmpleado) {
    const id =element.idUsuario;
    // Implementa la lógica para mostrar los detalles del elemento seleccionado aquí
    console.log('Detalles de:');
    // Puedes abrir un modal, mostrar información adicional, etc.
    this.router.navigateByUrl(`/dashboard/empleado/edditEmp/${id}`)
  }

  constructor(private router:Router,
    private dialog: MatDialog,
    private EmpleadoService:EmpleadoService
    ) {
     this.dataSource = new MatTableDataSource<listaEmpleado>([]);
    }
 
    eliminarElemento(element: listaEmpleado): void {
      const index = this.dataSource.data.indexOf(element);    
      if (index >= 0) {
        const idUsuario=element.idUsuario; 
        this.dataSource.data.splice(index, 1);
        this.EmpleadoService.eliminarUsuario(idUsuario).subscribe();
        this.dataSource._updateChangeSubscription(); // Actualizar la vista de la tabla
      }
    }
    mostrarDialogoDeConfirmacion(element: listaEmpleado): void {
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
      this.EmpleadoService.listaEmpleado().subscribe((respuesta: listaEmpleado[]) => {
        console.log(respuesta);
        this.listaEmpleado = respuesta;
        this.dataSource.data = respuesta; // Actualiza el origen de datos con los resultados
      });
    }
  
  }