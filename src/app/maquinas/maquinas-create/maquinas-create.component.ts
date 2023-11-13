import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MaquinasService } from '../maquinas.service';
import { AvisoDialogComponent } from 'src/app/maquinas/aviso-dialog/aviso-dialog.component'
import { MatDialog } from '@angular/material/dialog';
import { AvisoErrorComponent } from 'src/app/maquinas/aviso-error/aviso-error.component';

@Component({
  selector: 'app-maquinas-create',
  templateUrl: './maquinas-create.component.html',
  styleUrls: ['./maquinas-create.component.css'],
})
export class MaquinasCreateComponent implements OnInit {
  formularioMaquina: FormGroup;
  areas: any[]=[];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private MaquinasService: MaquinasService,
    private dialog: MatDialog
  ) {
    this.formularioMaquina = this.formBuilder.group({
      Numero: ['', [Validators.required]],
      Serie: [''],
      Modelo: [''],
      Descripcion: [''],
      Estado: [''],
      Area: ['']
    });
  }

  CANCELAR() {
    this.router.navigateByUrl('/dashboard/maquinas/maquinas');
  }

  enviarDatos(): void {
    if (this.formularioMaquina.valid) {
      console.log('Se presionó el botón');
      console.log(this.formularioMaquina.value);
      this.MaquinasService.agregarMaquina(this.formularioMaquina.value).subscribe(
        (response) => {
         console.log('Se registro correctamente');
         this.mostratDialogoAviso();
        },
        (error) => {
          // Manejar errores del servicio aquí
          this.mostrarDialogError();
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
        this.router.navigateByUrl('/dashboard/maquinas/maquinas');
      }
    });
  
  }

   
  mostrarDialogError():void{
    const dialogAviso = this.dialog.open(AvisoErrorComponent,{
      data: {message: 'Hubo un error al registrar en la Base de Datos'}
    });
    dialogAviso.afterClosed().subscribe(result => {
      if (result) {
      
      }
    });
  
  }

  ngOnInit(): void {
    // Puedes realizar alguna inicialización adicional aquí si es necesario.
    this.MaquinasService.getAreas().subscribe((data) => {
      this.areas = data;
    });
  }
}
