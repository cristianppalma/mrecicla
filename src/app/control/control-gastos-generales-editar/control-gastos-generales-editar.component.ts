import { Component , OnInit} from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ControlService } from '../control.service';
import { MatDialog } from '@angular/material/dialog';
import { AvisoDialogComponent } from 'src/app/maquinas/aviso-dialog/aviso-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/maquinas/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-control-gastos-generales-editar',
  templateUrl: './control-gastos-generales-editar.component.html',
  styleUrls: ['./control-gastos-generales-editar.component.css']
})
export class ControlGastosGeneralesEditarComponent implements OnInit {
  maquinas: any[]=[];
  formularioEditarGastos: FormGroup;
  idControl: any; // ID del registro a editar
  areaNombre:  string | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private formBuilder: FormBuilder,
    private ControlService: ControlService,
    private dialog: MatDialog
    ) {
      const idArea1 = localStorage.getItem("idArea");
      this.ControlService.getMaquinas(idArea1).subscribe((data) => {
        this.maquinas = data;
      });
      const correoSave = this.ControlService.getCorreo();
      this.formularioEditarGastos = this.formBuilder.group({
        Concepto: [''],
        Descripcion: [''],
        Periodo: [''],
        Monto:['', [Validators.required]],
        Tipo:[''],
        Maquina: [''],
        UsuarioActualizador:[correoSave],
      });

      this.activatedRoute.paramMap.subscribe((params) => {
        this.idControl = params.get('id');
        console.log('ID Recibido:', this.idControl);
        this.ControlService.consultargasto(this.idControl).subscribe(respuesta => {
          console.log('Respuesta del servicio:', respuesta)

        if (respuesta && typeof respuesta === 'object') {
          // Asegúrate de que los datos se serialicen como JSON válido
          try {
            this.formularioEditarGastos.setValue({
              Concepto: respuesta.Concepto,
              Descripcion: respuesta.Descripcion,
              Periodo: respuesta.Periodo,
              Monto: respuesta.Monto,
              Tipo: respuesta.Tipo,
              Maquina: respuesta.Maquina || '',
              UsuarioActualizador: respuesta.UsuarioActualizador || correoSave
            });
          } catch (error) {
            console.error('Error al deserializar los datos JSON:', error);
          }
        } else {
          console.error('No se encontraron datos válidos para el ID proporcionado.');
          // Aquí puedes mostrar un mensaje de error al usuario o redirigir a una página de error.
        }   });  });
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

  ngOnInit(): void {
    this.areaNombre = localStorage.getItem("NombreArea");
    console.log('Nombre del area: ', this.areaNombre);

    const idArea = this.ControlService.getidArea();
    console.log('ID de area desde el localStorage: ', idArea);
    
    console.log('AQUI ABAJO SE MOSTRARIA EL CORREO QUE SE TRAE DESDE EL LOCALSTORAGE');
    const correoSave = this.ControlService.getCorreo();
    console.log('Correo desde el localStorage: ', correoSave);

    console.log('AQUI ABAJO SE MOSTRARIA EL NOMBRE QUE SE TRAE DESDE EL LOCALSTORAGE');
    const nombreSave = this.ControlService.getNombre();
    console.log('Nombre desde el localStorage: ', nombreSave);
  }

}
