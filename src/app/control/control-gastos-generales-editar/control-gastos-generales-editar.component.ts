import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ControlService } from '../control.service';
import { ActivatedRoute } from '@angular/router';
import { AvisoDialogComponent } from 'src/app/maquinas/aviso-dialog/aviso-dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-control-gastos-generales-editar',
  templateUrl: './control-gastos-generales-editar.component.html',
  styleUrls: ['./control-gastos-generales-editar.component.css']
})
export class ControlGastosGeneralesEditarComponent implements OnInit {
  formularioEditarGastos: FormGroup;
  idControl: any; // ID del registro a editar
  constructor(private router:Router,
              private dialog: MatDialog, 
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private ControlService: ControlService,) {
                this.formularioEditarGastos = this.formBuilder.group({
                  Concepto: [''],
                  Descripcion: [''],
                  Periodo: [''],
                  UsuarioCreador: [''],
                  FechaCreacion: [''],
                  UsuarioActualizar: [''],
                  FechaActualizacion:[''],
                  Monto:['', [Validators.required]],
                  Tipo:['']
                });
                // Obtener el ID del registro a editar desde la URL
                this.activatedRoute.paramMap.subscribe(params => {
                this.idControl = params.get('id'); // Supongamos que el parámetro en la URL se llama 'id'
                // Luego, con el ID, podrías obtener los datos actuales del registro desde tu servicio y cargarlos en el formulario
                this.ControlService.consultargasto(this.idControl).subscribe((respuesta=>{
                  this.formularioEditarGastos.setValue({
                    Concepto: respuesta.Concepto,
                    Descripcion: respuesta.Descripcion,
                    Periodo: respuesta.Periodo,
                    UsuarioCreador: respuesta.UsuarioCreador,
                    FechaCreacion: respuesta.FechaCreacion,
                    UsuarioActualizar: respuesta.UsuarioActualizar,
                    FechaActualizacion: respuesta.FechaActualizacion,
                    Monto: respuesta.Monto,
                    Tipo: respuesta.Tipo
                  });
                }))
                //this.ControlService.obtenerGasto(this.idControl).subscribe(gasto => {
                //this.formularioEditarGastos.patchValue(gasto);
        })
      }

  CancelarGastosGeneralesEditar(){
    this.router.navigateByUrl('/dashboard/control/controlGastosGenerales');
  }
  enviarDatosActualizarGastos(){
    if (this.formularioEditarGastos.valid) {
      console.log('Se presionó el botón');
      console.log(this.formularioEditarGastos.value);
      this.ControlService.editargasto(this.idControl,this.formularioEditarGastos.value).subscribe(
        (response) => {
         console.log('Se actualizo correctamente');
         this.mostratDialogoAviso();
         
        
        },
        (error) => {
          // Manejar errores del servicio aquí7
          
        }
      );
    }
  }
  mostratDialogoAviso():void{
    const dialogAviso = this.dialog.open(AvisoDialogComponent,{
      data: {message: 'Se actualizo correctamente en la Base de Datos'}
    });
    dialogAviso.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigateByUrl('/dashboard/control/controlGastosGenerales');
      }
    });
  
  }
  

  ngOnInit(): void {
    
  }

}


