import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmpleadoService } from '../empleado.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AvisoDialogComponent } from '../aviso-dialog/aviso-dialog.component'
import { MatTableModule } from '@angular/material/table';import { MatTableDataSource } from '@angular/material/table';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';

interface puesto {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-agregar-empleado',
  templateUrl: './agregar-empleado.component.html',
  styleUrls: ['./agregar-empleado.component.css']
})
export class AgregarEmpleadoComponent implements OnInit{
  formularioEmpleado: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private EmpleadoService: EmpleadoService,
    private dialog: MatDialog
  ) {
    this.formularioEmpleado = this.formBuilder.group({
      Nombre: ['', [Validators.required]],
      ApellidoPaterno: [''],
      ApellidoMaterno: [''],
      Pass: [''],
      Puesto: [''],
      Correo: ['']
    });
  }

  CANCELAR() {
    this.router.navigateByUrl('/dashboard/maquinas/maquinas');
  }

  enviarDatos(): void {
    if (this.formularioEmpleado.valid) {
      console.log('Se presionó el botón');
      console.log(this.formularioEmpleado.value);
      this.EmpleadoService.AgregarUsuartio(this.formularioEmpleado.value).subscribe(
        (response) => {
         console.log('Se registro correctamente');
         this.mostratDialogoAviso();
         
        
        },
        (error) => {
          console.log('Aqui trono');

          // Manejar errores del servicio aquí
        }
      );
    }
  }
  mostratDialogoAviso():void{
    console.log('Tumadre');
    const dialogAviso = this.dialog.open(AvisoDialogComponent,{
      data: {message: 'Se registro correctamente en la Base de Datos'}
    });
    dialogAviso.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigateByUrl('/dashboard/empleado/listEmp');
      }
    });
  
  }

  ngOnInit(): void {
    // Puedes realizar alguna inicialización adicional aquí si es necesario.
  }
  
  puestos: puesto[] = [
    {value: 'Operador-costura-0', viewValue: ' Operador de costura circular'},
    {value: 'Supervisor-1', viewValue: 'Supervisor'},
    {value: 'Mecanico-2', viewValue: 'Mecanico GRAL'},
    {value: 'Hilador-2', viewValue: 'Hilador'},
  ];

}
