import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ControlService } from '../control.service';

import { AvisoDialogComponent } from 'src/app/maquinas/aviso-dialog/aviso-dialog.component'
import { MatDialog } from '@angular/material/dialog';


import { ConfirmationDialogComponent } from 'src/app/maquinas/confirmation-dialog/confirmation-dialog.component'

@Component({
  selector: 'app-control-gastos-generales-crear',
  templateUrl: './control-gastos-generales-crear.component.html',
  styleUrls: ['./control-gastos-generales-crear.component.css']
})


export class ControlGastosGeneralesCrearComponent implements OnInit {
  formularioGastos: FormGroup;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private ControlService: ControlService,
    private dialog: MatDialog
  ) {
    this.formularioGastos = this.formBuilder.group({
      Concepto: ['', [Validators.required]],
      Descripcion: ['', [Validators.required]],
      Periodo: ['', [Validators.required]],
      UsuarioCreador: ['', [Validators.required]],
      FechaCreacion: ['', [Validators.required]],
      UsuarioActualizar: ['', [Validators.required]],
      FechaActualizacion:['', [Validators.required]],
      Monto:['', [Validators.required]],
      Tipo:['', [Validators.required]]
    });
  }

  CancelarGastosGeneralesCrear(){
    this.router.navigateByUrl('/dashboard/control/controlGastosGenerales');
  }
  mostrarDialogDeConfirmacion3(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    data: { message: '¿Estás seguro de que deseas cancelar este registro?' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigateByUrl('/dashboard/control/controlGastosGenerales');
      }
    });
  }

  enviarDatos(): void {
    if (this.formularioGastos.valid) {
      console.log('Se presionó el botón');
      console.log(this.formularioGastos.value);
      this.ControlService.agregargasto(this.formularioGastos.value).subscribe(
        (response) => {
         console.log('Se registro correctamente');
         this.mostratDialogoAviso();
         
        
        },
        (error) => {
          // Manejar errores del servicio aquí
          console.log(error);
          
        }
      );
    }
  }
  mostratDialogoAviso():void{
    const dialogAviso = this.dialog.open(AvisoDialogComponent,{
      data: {message: 'Se registro correctamente en la Base de Datos'}
    });
    dialogAviso.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigateByUrl('/dashboard/control/controlGastosGenerales');
      }
    });
  
  }

  

  ngOnInit(): void {
    // Puedes realizar alguna inicialización adicional aquí si es necesario.
  }
}
