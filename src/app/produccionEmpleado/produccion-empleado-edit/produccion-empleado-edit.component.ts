import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProduccionEmpleadoService } from '../produccion-empleado.service';
import { AvisoDialogComponent } from '../aviso-dialog/aviso-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-produccion-empleado-edit',
  templateUrl: './produccion-empleado-edit.component.html',
  styleUrls: ['./produccion-empleado-edit.component.css']
})
export class ProduccionEmpleadoEditComponent implements OnInit {

  usuarioTienePermisoAdmin: boolean;

  usuario: string | null;
  usuarioNombre: string | null;
  usuarioCorreo: string | null;

  maquinarias: any[];
  areas: any[];
  inventariosSalida: any[];
  productosEntrada: any[]; //Obtenemos los datos de la tabla productos
  formularioProduccionAreaDetails: FormGroup;
  elID:any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private produccionEmpleadoService: ProduccionEmpleadoService,
    private dialog:MatDialog
  ){
    const idUserSave = this.produccionEmpleadoService.getId();
    const nombreSave = this.produccionEmpleadoService.getNombre();
    const correoSave = this.produccionEmpleadoService.getCorreo();
    this.formularioProduccionAreaDetails = this.formBuilder.group({
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
      idProductosalida: [''],
      UsuarioCreador:[''],
      idUsuario : [''],
      // idEmpleado: [''],
      UsuarioActualizador : [correoSave],

    });

    this.usuarioTienePermisoAdmin = this.verificarPermisosUsuarioAdmin();

  }

  private verificarPermisosUsuarioAdmin(): boolean {
    const nombreUsuario = localStorage.getItem("NombreTipoUser");
    // Realiza la lógica para determinar si el usuario tiene permiso basado en su rol
    return ((nombreUsuario === "Administrador")); // Ejemplo: el usuario con rol "admin" tiene permiso
  }

  ngOnInit(): any {

    // console.log('AQUI ABAJO SE MOSTRARIA EL CORREO QUE SE TRAE DESDE EL LOCALSTORAGE');
      const correoSave = this.produccionEmpleadoService.getCorreo();
      console.log('Correo desde el localStorage: ', correoSave);

      // console.log('AQUI ABAJO SE MOSTRARIA EL NOMBRE QUE SE TRAE DESDE EL LOCALSTORAGE');
      const nombreSave = this.produccionEmpleadoService.getNombre();
      console.log('Nombre desde el localStorage: ', nombreSave);

      // console.log('AQUI ABAJO SE MOSTRARIA EL ID QUE SE TRAE DESDE EL LOCALSTORAGE');
      const idUserSave = this.produccionEmpleadoService.getId();
      console.log('ID desde el localStorage: ', idUserSave);


    this.elID=this.activatedRoute.snapshot.paramMap.get('id');

    console.log('Otenemos el ID de la produccion: ', this.elID);

    this.produccionEmpleadoService.verDetallesProduccionArea(this.elID).subscribe(respuesta =>

      {
        console.log('Respuesta del servicio:', respuesta);

        // Asegúrate de que respuesta sea un objeto JSON válido
        if (respuesta && typeof respuesta === 'object') {
          // Asegúrate de que los datos se serialicen como JSON válido
          try {
            this.formularioProduccionAreaDetails.setValue({
              FechaInicio: respuesta.FechaInicio.toString() || '',
              FechaFin: respuesta.FechaFin,
              HoraInicio: respuesta.HoraInicio,
              HoraFin: respuesta.HoraFin,
              Turno: respuesta.Turno,
              UnidadesInsumo: respuesta.UnidadesInsumo,
              KgProduccion: respuesta.KgProduccion,
              idMaquinaria: respuesta.idMaquinaria.toString(),
              idArea: respuesta.idArea.toString(),
              idInventarioFabrica: respuesta.idInventarioFabrica.toString(),
              idProductosalida: respuesta.idProductosalida.toString(),
              UsuarioCreador:respuesta.Nombre.toString() || 'na',
              idUsuario : respuesta.idEmpleado,
              UsuarioActualizador: respuesta.UsuarioActualizador || correoSave,
            });


          } catch (error) {
            console.error('Error al deserializar los datos JSON:', error);
          }
        } else {
          console.error('No se encontraron datos válidos para el ID proporcionado.');
          // Aquí puedes mostrar un mensaje de error al usuario o redirigir a una página de error.
        }
      }
      , error => {
        console.log('ERRRO DE LA SOLICITUD: ', error);
      }
    );

    this.usuario = localStorage.getItem("id_user");
    console.log('ID del usuario logueado: ', this.usuario);

   /* this.usuarioNombre = localStorage.getItem("Nombre");
    console.log('Nombre', this.usuarioNombre);*/

    this.usuarioCorreo = localStorage.getItem("Correo");
    console.log('Correo del usuario logueado: ', this.usuarioCorreo);


    this.produccionEmpleadoService.selectMaquinaria().subscribe((data)=>{
      this.maquinarias=data;
    });

    this.produccionEmpleadoService.selectAreas().subscribe((data)=>{
      this.areas=data;
    });

     //
     this.produccionEmpleadoService.selectInventarioSalida().subscribe((data)=>{
      this.inventariosSalida=data;
    })

    // Obtenemos los nombres de los registros de la tabla productos
    this.produccionEmpleadoService.selectProductoEntrada().subscribe((data)=>{
      this.productosEntrada=data;
    })
  }

  //Funcion para ir a la pagina anterior
  cancelar() {
    // this.router.navigateByUrl('/dashboard/produccion-empleado/produccionEmpleado');
    if (window.history.length > 1) {
      // Si hay más de una página en el historial, regresa a la página anterior
      window.history.back();
    } else {
      // Si no hay más páginas en el historial, puedes redirigir a una página específica
      // o realizar alguna otra acción en su lugar.
      console.warn('No hay páginas anteriores en el historial.');
      // Puedes redirigir a otra página o realizar otra acción aquí
    }
  }

  enviarDatos(): void {
    if (this.formularioProduccionAreaDetails.valid) {
      console.log('Id recibido: ', this.elID);
      console.log('Datos que se enviaran: ', this.formularioProduccionAreaDetails.value);

      this.produccionEmpleadoService.actualizarProduccionArea(this.elID, this.formularioProduccionAreaDetails.value).subscribe(
        (respuesta)=> {
          console.log('Respuesta del servidor: ', respuesta);

          if (respuesta.success === 1) {
            console.log('La actualización fue exitosa');
            // accede a los datos actualizados
            const produccionAreaActualizado = respuesta.data;
            console.log('Datos de la produccion area actualizado: ', produccionAreaActualizado);
            this.mostrarDialogoAviso();
          } else {
            console.error('Error al actualizar la produccion area: ', respuesta.error);
            // Manejar errores del servicio aquí
          }

        },
        (error) => {
          console.error('Erros al actualizar la produccion area con error: ', error);
        }
      );
    }
  }

  mostrarDialogoAviso():void {
    const dialogAviso = this.dialog.open(AvisoDialogComponent,{
      data: {message: 'Se actualizo correctamente en la Base de Datos'}
    });
    dialogAviso.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigateByUrl('/dashboard/produccion/produccionList');
      }
    });
  }

}
