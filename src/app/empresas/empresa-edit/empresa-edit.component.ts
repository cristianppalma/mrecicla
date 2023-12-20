import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog';
import { AvisoDialogComponent } from 'src/app/maquinas/aviso-dialog/aviso-dialog.component';
import { EmpresaService } from '../empresa.service';


@Component({
  selector: 'app-empresa-edit',
  templateUrl: './empresa-edit.component.html',
  styleUrls: ['./empresa-edit.component.css']
})
export class EmpresaEditComponent implements OnInit {

  formularioEditEmpresa: FormGroup;
  idRecibido:any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private empresaService: EmpresaService,
    private dialog: MatDialog
  ) {
    const correoSave = this.empresaService.getCorreo();
    this.formularioEditEmpresa = this.formBuilder.group({
      NombreFabrica: [''],
      DescripcionFabrica: [''],
      RFC: [''],
      Presupuesto: [''],
      DireccionFabrica: [''],
      TelefonoFabrica: [''],
      CorreoFabrica: [''],
      UsuarioActualizador: [correoSave],
    });
  }


  ngOnInit(): void {

    //Traemos el correo y nombre desde el servicio
      console.log('AQUI ABAJO SE MOSTRARIA EL CORREO QUE SE TRAE DESDE EL LOCALSTORAGE');
      const correoSave = this.empresaService.getCorreo();
      console.log('Correo desde el localStorage: ', correoSave);

      console.log('AQUI ABAJO SE MOSTRARIA EL NOMBRE QUE SE TRAE DESDE EL LOCALSTORAGE');
      const nombreSave = this.empresaService.getNombre();
      console.log('Nombre desde el localStorage: ', nombreSave);

      //Obtenemos el id y desde el servicio obtenemos los campos
      this.idRecibido=this.activatedRoute.snapshot.paramMap.get('id');
      console.log('OBTENEMOS EL ID: ', this.idRecibido);
      this.empresaService.obtenerEmpresasPorId(this.idRecibido).subscribe(
        respuesta => {
          console.log('Respuesta del servicio',respuesta);

          this.formularioEditEmpresa.setValue({
            NombreFabrica: respuesta.NombreFabrica,
            DescripcionFabrica: respuesta.DescripcionFabrica,
            RFC: respuesta.RFC,
            Presupuesto: respuesta.Presupuesto,
            DireccionFabrica: respuesta.DireccionFabrica,
            TelefonoFabrica: respuesta.TelefonoFabrica,
            CorreoFabrica: respuesta.CorreoFabrica,
            UsuarioActualizador: respuesta.UsuarioActualizador || correoSave,
          });

        }, error => {
          console.error('ERROR DE LA SOLICITUD: ',error);
        }
      );
    }

    cancelar() {
      this.router.navigateByUrl('/dashboard/empresas/empresas');
    }


    enviarDatos(): void {
      if (this.formularioEditEmpresa.valid) {
        console.log('Id recibido: ', this.idRecibido);
        console.log('Datos que se enviaran: ', this.formularioEditEmpresa.value);

        this.empresaService.actualizarEmpresas(this.idRecibido, this.formularioEditEmpresa.value).subscribe(
          (respuesta)=> {
            console.log('Respuesta del servidor: ', respuesta);

            if (respuesta.success === 1) {
              console.log('La actualización fue exitosa');
              // Accede a los datos actualizados
              const empresaActualizada = respuesta.data;
              console.log('Datos de la empresa actualizada: ', empresaActualizada);
              this.mostrarDialogoAviso();
            } else {
              console.error('Error al actualizar el proveedor: ', respuesta.error);
              // Manejar errores del servicio aquí
            }

          },
          (error) => {
            console.error('Error al actualizar el proveedor con error: ', error);
          }
        );
      }
    }

    mostrarDialogoAviso():void{
      const dialogAviso = this.dialog.open(AvisoDialogComponent,{
        data: {message: 'Se actualizo correctamente en la Base de Datos'}
      });
      dialogAviso.afterClosed().subscribe(result => {
        if (result) {
          this.router.navigateByUrl('/dashboard/empresas/empresas');
        }
      });

    }

}
