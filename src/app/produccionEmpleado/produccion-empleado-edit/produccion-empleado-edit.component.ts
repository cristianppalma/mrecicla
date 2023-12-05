import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProduccionEmpleadoService } from '../produccion-empleado.service';

@Component({
  selector: 'app-produccion-empleado-edit',
  templateUrl: './produccion-empleado-edit.component.html',
  styleUrls: ['./produccion-empleado-edit.component.css']
})
export class ProduccionEmpleadoEditComponent implements OnInit {

  usuarioId: string | null;
  usuarioNombre: string | null;
  usuarioCorreo: string | null;

  maquinarias: any[];
  areas: any[];
  inventariosSalida: any[];
  formularioProduccionAreaDetails: FormGroup;
  elID:any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private produccionEmpleadoService: ProduccionEmpleadoService,
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
      idUsuario: [''],
      UsuarioCreador : [''],
      UsuarioCreadorNombre: [''],
    });
  }

  ngOnInit(): any {

    console.log('AQUI ABAJO SE MOSTRARIA EL CORREO QUE SE TRAE DESDE EL LOCALSTORAGE');
      const correoSave = this.produccionEmpleadoService.getCorreo();
      console.log('Correo desde el localStorage: ', correoSave);

      console.log('AQUI ABAJO SE MOSTRARIA EL NOMBRE QUE SE TRAE DESDE EL LOCALSTORAGE');
      const nombreSave = this.produccionEmpleadoService.getNombre();
      console.log('Nombre desde el localStorage: ', nombreSave);

      console.log('AQUI ABAJO SE MOSTRARIA EL ID QUE SE TRAE DESDE EL LOCALSTORAGE');
      const idUserSave = this.produccionEmpleadoService.getId();
      console.log('ID desde el localStorage: ', idUserSave);


    this.elID=this.activatedRoute.snapshot.paramMap.get('id');
    console.log('OBTENEMOS EL ID: ', this.elID);
    this.produccionEmpleadoService.verDetallesProduccionArea(this.elID).subscribe(
      respuesta => {
        console.log('Respuesta de la API: ', respuesta);
        const produccionArea = respuesta [0];
        console.log('datos del registro: ', produccionArea);
        this.formularioProduccionAreaDetails.setValue({
          FechaInicio: produccionArea.FechaInicio,
          FechaFin: produccionArea.FechaFin,
          HoraInicio: produccionArea.HoraInicio,
          HoraFin: produccionArea.HoraFin,
          Turno: produccionArea.Turno,
          UnidadesInsumo: produccionArea.UnidadesInsumo,
          KgProduccion: produccionArea.KgProduccion,
          idMaquinaria: produccionArea.idMaquinaria.toString(),
          idArea: produccionArea.idArea.toString(),
          idInventarioFabrica: produccionArea.idInventarioFabrica.toString(),
          idUsuario: produccionArea.idUsuario,
          UsuarioCreador: produccionArea.UsuarioCreador,
          UsuarioCreadorNombre: produccionArea.UsuarioCreadorNombre,
        });
      }, error => {
        console.log('ERRRO DE LA SOLICITUD: ', error);
      }
    );

    this.usuarioId = localStorage.getItem("id_user");
    console.log('ID: ', this.usuarioId);

    this.usuarioNombre = localStorage.getItem("Nombre");
    console.log('Nombre', this.usuarioNombre);

    this.usuarioCorreo = localStorage.getItem("Correo");
    console.log('Correo', this.usuarioCorreo);


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

}
