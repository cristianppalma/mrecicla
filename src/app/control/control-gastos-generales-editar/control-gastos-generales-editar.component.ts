import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ControlService } from '../control.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-control-gastos-generales-editar',
  templateUrl: './control-gastos-generales-editar.component.html',
  styleUrls: ['./control-gastos-generales-editar.component.css']
})
export class ControlGastosGeneralesEditarComponent implements OnInit {
  formularioEditarGastos: FormGroup;
  idControl: any; // ID del registro a editar
  constructor(private router:Router,
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

  GuardarGastosGeneralesEditar(){
    this.router.navigateByUrl('/dashboard/control/controlGastosGenerales');
  }

  CancelarGastosGeneralesEditar(){
    this.router.navigateByUrl('/dashboard/control/controlGastosGenerales');
  }
  
  enviarDatos (){}
  ngOnInit(): void {
    
  }

}


