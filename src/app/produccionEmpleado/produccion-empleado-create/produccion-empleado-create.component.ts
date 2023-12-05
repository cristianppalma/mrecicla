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

  usuarioId: string | null;
  usuarioNombre: string | null;
  usuarioCorreo: string | null;

  maquinarias: any[];
  areas: any[];
  inventariosSalida: any[];
  formularioProduccionArea: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private produccionEmpleadoService: ProduccionEmpleadoService,
    private dialog: MatDialog
  ) {
    const idUserSave = this.produccionEmpleadoService.getId();
    const nombreSave = this.produccionEmpleadoService.getNombre();
    const correoSave = this.produccionEmpleadoService.getCorreo();
    this.formularioProduccionArea = this.formBuilder.group({
      FechaInicio: [''],
      FechaFin: [''],
      HoraInicio: [''],
      HoraFin: [''],
      Turno: [''],
      UnidadesInsumo: [''],
      KgProduccion: [''],
      idMaquinaria: [''],
      idArea: [''],
      idInventarioFabrica: [''],
      idUsuario: [idUserSave],
      UsuarioCreador : [correoSave],
      UsuarioCreadorNombre: [nombreSave],
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

    // TRAEMOS EL ID
    console.log('AQUI MOSTRARIAMOS EL ID TRAIDO DESDE EL SERVICE');
    const idUserSave = this.produccionEmpleadoService.getId();
    console.log('ID del Usuario desde el service: ', idUserSave);

    this.usuarioId = localStorage.getItem("id_user");
    console.log('ID: ', this.usuarioId);

    // TRAEMOS EL NOMBRE
    console.log('AQUI MOSTRARIAMOS EL NOMBRE TRAIDO DESDE EL SERVICE');
    const nombreUserSave = this.produccionEmpleadoService.getNombre();
    console.log('Nombre del Usuario desde el service: ', nombreUserSave);

    this.usuarioNombre = localStorage.getItem("Nombre");
    console.log('Nombre', this.usuarioNombre);

    // TRAEMOS EL CORREO
    console.log('AQUI MOSTRARIAMOS EL COOREO TRAIDO DESDE EL SERVICE');
    const correoUserSave = this.produccionEmpleadoService.getCorreo();
    console.log('Correo del Usuario desde el service: ', correoUserSave);

    this.usuarioCorreo = localStorage.getItem("Correo");
    console.log('Correo', this.usuarioCorreo);

    //
    this.produccionEmpleadoService.selectMaquinaria().subscribe((data)=>{
      this.maquinarias=data;
    });

    //
    this.produccionEmpleadoService.selectAreas().subscribe((data)=>{
      this.areas=data;
    });

    //
    this.produccionEmpleadoService.selectInventarioSalida().subscribe((data)=>{
      this.inventariosSalida=data;
    })

  }

}
