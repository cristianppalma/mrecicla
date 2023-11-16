import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProduccionEmpleadoService } from '../produccion-empleado.service';
import { MatDialog } from '@angular/material/dialog';
import { AvisoDialogComponent } from '../aviso-dialog/aviso-dialog.component';

import { inject } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Dialog } from '@angular/cdk/dialog';


@Component({
  selector: 'app-produccion-empleado-create',
  templateUrl: './produccion-empleado-create.component.html',
  styleUrls: ['./produccion-empleado-create.component.css']
})
export class ProduccionEmpleadoCreateComponent implements OnInit {

  formularioProduccionArea: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private produccionEmpleadoService: ProduccionEmpleadoService,
    private dialog: MatDialog
  ) {
    this.formularioProduccionArea = this.formBuilder.group({
      FechaInicio: [''],
      FechaFin: [''],
      HoraInicio: [''],
      HoraFin: [''],
      Turno: [''],
      UnidadesInsumo: [''],
      KgProduccion: [''],
      // idMaquina: [''],
      // idArea: [''],
      // idEmpleado: [''],
    });
  }

  cancelar(){
    this.router.navigateByUrl('/dashboard/produccion-empleado/produccionEmpleado');
  }

  enviarDatos(): void{
    if (this.formularioProduccionArea.valid){
      console.log('Se presiono el boton de registrar');
      console.log(this.formularioProduccionArea.value);
      this.produccionEmpleadoService.agregarProduccionArea(this.formularioProduccionArea.value).subscribe(
        (response) => {
          console.log('Se inserto correctamente');
          console.log('respuesta exitosa:', response.headers);
          this.mostrarDialogoAviso();

        },
        (error) => {
          console.log('Hubo un error al insertar');
          console.log(this.formularioProduccionArea.value);
          console.log('Error en la solicitud:', error);
          //this.mostrarDialogoAviso();
        }
      );
    }
  }

  mostrarDialogoAviso(): void {
    const dialogAviso = this.dialog.open(AvisoDialogComponent,{
      data: {message: 'Se inserto correctamente el registro en la Base de Datos'}
    });
    dialogAviso.afterClosed().subscribe(result => {
      if(result) {
        this.router.navigateByUrl('/dashboard/produccion-empleado/produccionEmpleado');
      }
    });
  }

  ngOnInit(): void {
    const usuario = localStorage.getItem("id_user");
    console.log('ID: ', usuario);
  }

}
