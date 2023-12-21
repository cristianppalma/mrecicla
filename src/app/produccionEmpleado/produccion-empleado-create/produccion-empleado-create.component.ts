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
import { AvisoErrorComponent } from 'src/app/maquinas/aviso-error/aviso-error.component';

@Component({
  selector: 'app-produccion-empleado-create',
  templateUrl: './produccion-empleado-create.component.html',
  styleUrls: ['./produccion-empleado-create.component.css']
})
export class ProduccionEmpleadoCreateComponent implements OnInit {
  areaNombre: string | null;
  usuarioId: string | null;
  usuarioNombre: string | null;
  usuarioCorreo: string | null;
  maquinarias: any[];
  areas: any[];
  inventariosSalida: any[];
  productosEntrada: any[]; //Obtenemos los datos de la tabla productos
  formularioProduccionArea: FormGroup;
  turnousuario: any[];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private produccionEmpleadoService: ProduccionEmpleadoService,
    private dialog: MatDialog
  ) {
    const idUserSave = this.produccionEmpleadoService.getId();
    const nombreSave = this.produccionEmpleadoService.getNombre();
    const correoSave = this.produccionEmpleadoService.getCorreo();
    const idAreaUser = this.produccionEmpleadoService.getidArea();
    this.formularioProduccionArea = this.formBuilder.group({
      FechaInicio: [''],
      FechaFin: [''],
      HoraInicio: [''],
      HoraFin: [''],
      Turno: [''],
      UnidadesInsumo: [''],
      KgProduccion: [''],
      idMaquinaria: [''],
      idArea: [idAreaUser || ''],
      idInventarioFabrica: [''],
      idProductosalida: [''],
      idUsuario: [idUserSave],
      UsuarioCreador : [correoSave],
      // UsuarioCreadorNombre: [nombreSave + ' ' + apePatSave + ' ' + apeMatSave],
    });
  }

  cancelar(){
    this.router.navigateByUrl('/dashboard/produccion-empleado/produccionEmpleado');
  }

  /*enviarDatos(): void{
    const correoSave2 = this.produccionEmpleadoService.getCorreo();
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
  }*/

  enviarDatos(): void {
    const correoSave2 = this.produccionEmpleadoService.getCorreo();
    if (this.formularioProduccionArea.valid) {
      console.log('Se presionó el botón de registrar');
      console.log(this.formularioProduccionArea.value);
      this.produccionEmpleadoService.agregarProduccionArea(this.formularioProduccionArea.value).subscribe(
        (response) => {
          console.log('Respuesta exitosa:', response);
          if (response && response.success) {
            if (response.success === 1) {
              console.log('Producción insertada correctamente');
              this.mostrarDialogoAviso();
            } else if (response.success === 2) {
              console.log('Insumos insuficientes');
              this.mostrarDialogError('Insumos insuficientes');
              // Realiza acciones específicas para insumos insuficientes
            } else {
              console.log('Operación no exitosa:', response.mensaje);
              this.mostrarDialogError('Hubo un problema, no se pudo registrar');
            }
          } else {
            console.log('Respuesta desconocida:', response);
          }
        },
        (error) => {
          console.log('Hubo un error al insertar');
          console.log(this.formularioProduccionArea.value);
          console.log('Error en la solicitud:', error);
          this.mostrarDialogError('Error en la Base de Datos Contacte a Sistemas');
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


  mostrarDialogError(mensaje: string): void {
    const dialogAviso = this.dialog.open(AvisoErrorComponent, {
        data: { message: mensaje }
    });
    dialogAviso.afterClosed().subscribe(result => {
        if (result) {
            // Puedes realizar alguna acción adicional si es necesario
        }
    });
  }


  ngOnInit(): void {
    this.areaNombre = localStorage.getItem("NombreArea");
    console.log('ID: ', this.areaNombre);
    const idArea = this.produccionEmpleadoService.getidArea();
    // TRAEMOS EL ID
    console.log('AQUI MOSTRARIAMOS EL ID TRAIDO DESDE EL SERVICE');
    const idUserSave = this.produccionEmpleadoService.getId();
    console.log('ID del Usuario desde el service: ', idUserSave);

    const usuarioId = this.usuarioId = localStorage.getItem("id_user");
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

    //Aqui es lo de maquinas sin filtro
    /*this.produccionEmpleadoService.selectMaquinaria().subscribe((data)=>{
      this.maquinarias=data;
    });*/

    this.produccionEmpleadoService.getMaquinas(idArea).subscribe((data2)=>{
      this.maquinarias = data2
    });

    this.produccionEmpleadoService.getTurno(usuarioId).subscribe((data1)=>{
      this.turnousuario = data1;
      console.log('turno', this.turnousuario);
      this.formularioProduccionArea.patchValue({
        Turno: this.turnousuario[0]?.Turno || ''
      });
    });

    //
    this.produccionEmpleadoService.selectAreas().subscribe((data)=>{
      this.areas=data;
    });

    //
    this.produccionEmpleadoService.selectInventarioSalida1(idArea).subscribe((data)=>{
      this.inventariosSalida=data;
    })

    // Obtenemos los nombres de los registros de la tabla productos
    this.produccionEmpleadoService.selectProductoEntrada().subscribe((data)=>{
      this.productosEntrada=data;
    })

  }

}
