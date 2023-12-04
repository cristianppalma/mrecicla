import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { AvisoDialogComponent } from '../aviso-dialog/aviso-dialog.component'
import { MatDialog } from '@angular/material/dialog';
import { EmpleadoService } from '../empleado.service';
import { ActivatedRoute } from '@angular/router';
import { __param } from 'tslib';
import { FormGroup, FormBuilder, Validators, FormControl, FormsModule } from '@angular/forms';
import { Areas } from 'src/app/areas/areas';

@Component({
  selector: 'app-perfil-admin',
  templateUrl: './perfil-admin.component.html',
  styleUrls: ['./perfil-admin.component.css']
})
export class PerfilAdminComponent implements OnInit {

  // nombreUsuario: string | null;

  areas : any[];
  puestos : any[];
  tipoUsuarios : any[];

  formularioEditarEmpleado: FormGroup;
  idEmpleado: any;

  //   checkboxState: boolean = false;

  //   // Función para cambiar el estado del checkbox
  //   onCheckboxChange() {
  //     this.checkboxState = !this.checkboxState;
  //   }

  constructor(
    private editarEmpleado: EmpleadoService,
    private formbuilder: FormBuilder,
    private activateRoute : ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,


    ) {
      const correoSave = this.editarEmpleado.getCorreo();
      this.formularioEditarEmpleado = this.formbuilder.group({
        Nombre: [''],
        ApellidoPaterno: [''],
        ApellidoMaterno: [''],
        Correo: [''],
        Pass: [''],
        Practicante: [''],
        Sueldo : [''],
        Turno : [''],
        Domicilio : [''],
        idTipoUsuario : [''],
        // idTipoUsuario : [this.nombreUsuario],
        idAsignacion : [''],
        idArea : [''],
        UsuarioActualizador:[correoSave]
      });
     }

     ngOnInit(): void {

      // this.nombreUsuario = localStorage.getItem("NombreTipoUser");
      // console.log('NombreTipoUser', this.nombreUsuario);

      console.log('AQUI ABAJO SE MOSTRARIA EL CORREO QUE SE TRAE DESDE EL LOCALSTORAGE');
      const correoSave = this.editarEmpleado.getCorreo();
      console.log('Correo desde el localStorage: ', correoSave);

      console.log('AQUI ABAJO SE MOSTRARIA EL NOMBRE QUE SE TRAE DESDE EL LOCALSTORAGE');
      const nombreSave = this.editarEmpleado.getNombre();
      console.log('Nombre desde el localStorage: ', nombreSave);

      this.idEmpleado = this.activateRoute.snapshot.paramMap.get('id');
        console.log('Obtenemos el ID: ',this.idEmpleado);
        this.editarEmpleado.EditarEmpleado(this.idEmpleado).subscribe(
          respuesta => {
          console.log('Respuesta del servicio', respuesta);
            // const empleado = respuesta [0];
            // console.log('datos del registro: ', empleado);
            // Asegúrate de que respuesta sea un objeto JSON válido
        if (respuesta && typeof respuesta === 'object') {
          // Asegúrate de que los datos se serialicen como JSON válido
          try {

          this.formularioEditarEmpleado.setValue({
            Nombre: respuesta.Nombre,
            ApellidoPaterno: respuesta.ApellidoPaterno,
            ApellidoMaterno: respuesta.ApellidoMaterno,
            Correo: respuesta.Correo,
            Pass: respuesta.Pass,
            Practicante: respuesta.Practicante,
            Sueldo: respuesta.Sueldo,
            Turno: respuesta.Turno,
            Domicilio: respuesta.Domicilio,
            idTipoUsuario: respuesta.idTipoUsuario.toString(),
            idAsignacion: respuesta.idAsignacion.toString(),
            idArea: respuesta.idArea.toString(),
            UsuarioActualizador: respuesta.UsuarioActualizador || correoSave,
          });

        } catch (error) {
          console.error('Error al deserializar los datos JSON:', error);
        }
      } else {
        console.error('No se encontraron datos válidos para el ID proporcionado.');
      }

        });

      this.formularioEditarEmpleado.controls['Practicante'].valueChanges.subscribe(
        (Practicante) => {
          if (Practicante === 'No') {
            this.formularioEditarEmpleado.controls['idAsignacion'].enable();
            this.formularioEditarEmpleado.controls['Turno'].enable();
            this.formularioEditarEmpleado.controls['idArea'].enable();
            this.formularioEditarEmpleado.controls['Sueldo'].enable();

          } else {
            this.formularioEditarEmpleado.controls['idAsignacion'].disable();
            this.formularioEditarEmpleado.controls['Turno'].disable();
            this.formularioEditarEmpleado.controls['idArea'].disable();
            this.formularioEditarEmpleado.controls['Sueldo'].disable();

            this.formularioEditarEmpleado.controls['idAsignacion'].reset();
            this.formularioEditarEmpleado.controls['Turno'].reset();
            this.formularioEditarEmpleado.controls['idArea'].reset();
            this.formularioEditarEmpleado.controls['Sueldo'].reset();
          }
        }

        );

      this.editarEmpleado.SelectAreas().subscribe((data) => {
        this.areas=data;
      });

      this.editarEmpleado.SelectPuestos().subscribe((data) => {
        this.puestos=data;
      });

      this.editarEmpleado.SelectTipoUsuarios().subscribe((data) => {
        this.tipoUsuarios=data;
      });
    }

     enviarDatos(): void {
      if (this.formularioEditarEmpleado.valid) {
        console.log('Id recibido: ', this.idEmpleado);
        console.log('Datos que se enviaran: ', this.formularioEditarEmpleado.value);
        this.editarEmpleado.UpdateEmpleado(this.idEmpleado, this.formularioEditarEmpleado.value).subscribe(
          (response) => {
           console.log('Respuesta del servidor: ', response);

           if (response.success === 1){
            console.log('La actualización fue exitosa');

            const usuarioActualizado = response.data;
            console.log('Datos del usuario actualizados: ', usuarioActualizado);
           this.mostratDialogoAviso();
           } else {
            console.error('Error al actualizar el usuario: ', response.error);

           }

          },
          (error) => {
            console.error('Error al actualizar el usuario con error: ', error);
          }
        );
      }
    }
    mostratDialogoAviso():void{
      console.log('Tumadre');
      const dialogAviso = this.dialog.open(AvisoDialogComponent,{
        data: {message: 'Se Actualizo correctamente el Empleado'}
      });
      dialogAviso.afterClosed().subscribe(result => {
        if (result) {
          this.router.navigateByUrl('/dashboard/empleado/listEmp');
        }
      });

    }

}
