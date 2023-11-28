import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, FormsModule } from '@angular/forms';
import { EmpleadoService } from '../empleado.service';
import { AvisoDialogComponent } from '../aviso-dialog/aviso-dialog.component'
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-agregar-empleado',
  templateUrl: './agregar-empleado.component.html',
  styleUrls: ['./agregar-empleado.component.css']
})
export class AgregarEmpleadoComponent implements OnInit{
  formularioEmpleado: FormGroup;
  areas : any[]= [];
  puestos : any[]= [];
  tipoUsuarios : any[]= [];
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private EmpleadoService: EmpleadoService,
    private dialog: MatDialog
  ) {
    const correoSave = this.EmpleadoService.getCorreo();
    this.formularioEmpleado = this.formBuilder.group({
      Nombre: [''],
      ApellidoPaterno: [''],
      ApellidoMaterno: [''],
      Correo: [''],
      Pass: [''],
      Practicante: ['No'],
      Sueldo : [''],
      Turno : [''],
      Domicilio : [''],
      idTipoUsuario : [''],
      idAsignacion : [''],
      idArea : [''],
      UsuarioCreador : [correoSave]
    });
    // this.formularioEmpleado = new FormGroup({
    //   Practicante: new FormControl('No'),
    //   Nombre: new FormControl('', [Validators.required]),
    //   ApellidoPaterno: new FormControl('', [Validators.required]),
    //   ApellidoMaterno: new FormControl('', [Validators.required]),
    //   Pass: new FormControl('', [Validators.required]),
    //   idAsignacion : new FormControl(''),
    //   // Puesto: new FormControl(''),
    //   Correo: new FormControl('', [Validators.required]),
    //   Turno : new FormControl(''),
    //   idArea : new FormControl (''),
    //   Sueldo : new FormControl (''),
    //   Domicilio : new FormControl('', [Validators.required]),
    //   idTipoUsuario : new FormControl('')
    // });
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
          console.log(error);


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

    this.formularioEmpleado.controls['Practicante'].valueChanges.subscribe(
      (Practicante) => {
        if (Practicante === 'No') {
          // this.formularioEmpleado.controls['Puesto'].enable();
          this.formularioEmpleado.controls['idAsignacion'].enable();
          this.formularioEmpleado.controls['Turno'].enable();
          this.formularioEmpleado.controls['idArea'].enable();
          this.formularioEmpleado.controls['Sueldo'].enable();

        } else {
          // this.formularioEmpleado.controls['Puesto'].disable();
          this.formularioEmpleado.controls['idAsignacion'].disable();
          this.formularioEmpleado.controls['Turno'].disable();
          this.formularioEmpleado.controls['idArea'].disable();
          this.formularioEmpleado.controls['Sueldo'].disable();

          // this.formularioEmpleado.controls['Puesto'].reset();
          this.formularioEmpleado.controls['idAsignacion'].reset();
          this.formularioEmpleado.controls['Turno'].reset();
          this.formularioEmpleado.controls['idArea'].reset();
          this.formularioEmpleado.controls['Sueldo'].reset();


        }
      }

      );

    // Puedes realizar alguna inicialización adicional aquí si es necesario.
    this.EmpleadoService.SelectAreas().subscribe((data) => {
      this.areas=data;
    });

    this.EmpleadoService.SelectPuestos().subscribe((data) => {
      this.puestos=data;
    });

    this.EmpleadoService.SelectTipoUsuarios().subscribe((data) => {
      this.tipoUsuarios=data;
    });

     // TRAEMOS EL CORREO DESDE EL SERVICIO
     console.log('AQUI ABAJO SE MOSTRARIA EL CORREO QUE SE TRAE DESDE EL LOCALSTORAGE');
     const correoSave = this.EmpleadoService.getCorreo();
     console.log('Correo desde el localStorage: ', correoSave);

     console.log('AQUI ABAJO SE MOSTRARIA EL NOMBRE QUE SE TRAE DESDE EL LOCALSTORAGE');
     const nombreSave = this.EmpleadoService.getNombre();
     console.log('Nombre desde el localStorage: ', nombreSave);

  }

}
