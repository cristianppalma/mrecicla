import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ControlService } from '../control.service';
import { ActivatedRoute } from '@angular/router';
import { AvisoDialogComponent } from 'src/app/maquinas/aviso-dialog/aviso-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/maquinas/confirmation-dialog/confirmation-dialog.component';
import { AvisoErrorComponent } from 'src/app/maquinas/aviso-error/aviso-error.component';

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
                const correoSave = this.ControlService.getCorreo();
                this.formularioEditarGastos = this.formBuilder.group({
                  Concepto: [''],
                  Descripcion: [''],
                  Periodo: [''],
                  Monto:['', [Validators.required]],
                  Tipo:[''],
                  UsuarioActualizador:[correoSave],
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
                    Monto: respuesta.Monto,
                    Tipo: respuesta.Tipo,
                    UsuarioActualizador: respuesta.UsuarioActualizador ||correoSave,
                  });
                }))
                //this.ControlService.obtenerGasto(this.idControl).subscribe(gasto => {
                //this.formularioEditarGastos.patchValue(gasto);
        })
      }

  CancelarGastosGeneralesEditar(){
    this.router.navigateByUrl('/dashboard/control/controlGastosGenerales');
  }

  mostrarDialogDeConfirmacion2(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    data: { message: '¿Estás seguro de que deseas cancelar este registro?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigateByUrl('/dashboard/control/controlGastosGenerales');
      }
    });
  }

  enviarDatosActualizarGastos(){
    if (this.formularioEditarGastos.valid) {
      console.log('Se presionó el botón');
      console.log(this.formularioEditarGastos.value);
      this.ControlService.editargasto(this.idControl,this.formularioEditarGastos.value).subscribe(
        (response) => {
         console.log('Respuesta del servidor: ', response);

         if (response.success === 1) {
          console.log('Se actualizo correctamente');

          const controlActualizado = response.data;
          console.log('Datos del gasto actualizado: ', controlActualizado);

          this.mostratDialogoAviso();
         } else {
          console.error('Error al actualizar el gasto: ', response.error);
         }

        },
        (error) => {
          // Manejar errores del servicio aquí7
          console.error('Error al actualizar el gasto: ', error);
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
    // Puedes realizar alguna inicialización adicional aquí si es necesario.
    console.log('AQUI ABAJO SE MOSTRARIA EL CORREO QUE SE TRAE DESDE EL LOCALSTORAGE');
    const correoSave = this.ControlService.getCorreo();
    console.log('Correo desde el localStorage: ', correoSave);

    console.log('AQUI ABAJO SE MOSTRARIA EL NOMBRE QUE SE TRAE DESDE EL LOCALSTORAGE');
    const nombreSave = this.ControlService.getNombre();
    console.log('Nombre desde el localStorage: ', nombreSave);
  }

}


