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

  usuario: string | null;
  usuarioNombre: string | null;
  maquinarias: any[];
  areas: any[];
  // inventarios: any[];
  inventariosSalida: any[];
  formularioProduccionAreaDetails: FormGroup;
  elID:any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private produccionEmpleadoService: ProduccionEmpleadoService,
  ){
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
      // idproducto: [''],
      idInventarioFabrica: [''],
      // idEmpleado: [''],
      UsuarioActualizador : [correoSave]
    });
  }

  ngOnInit(): any {

    console.log('AQUI ABAJO SE MOSTRARIA EL CORREO QUE SE TRAE DESDE EL LOCALSTORAGE');
      const correoSave = this.produccionEmpleadoService.getCorreo();
      console.log('Correo desde el localStorage: ', correoSave);

      console.log('AQUI ABAJO SE MOSTRARIA EL NOMBRE QUE SE TRAE DESDE EL LOCALSTORAGE');
      const nombreSave = this.produccionEmpleadoService.getNombre();
      console.log('Nombre desde el localStorage: ', nombreSave);


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
          // idproducto: produccionArea.idproducto.toString(),
          idInventarioFabrica: produccionArea.idInventarioFabrica.toString(),
          UsuarioActualizador: produccionArea.UsuarioActualizador || correoSave,
        });
      }, error => {
        console.log('ERRRO DE LA SOLICITUD: ', error);
      }
    );

    this.usuario = localStorage.getItem("id_user");
    console.log('ID: ', this.usuario);

    this.usuarioNombre = localStorage.getItem("Nombre");
    console.log('Nombre', this.usuarioNombre);

    this.produccionEmpleadoService.selectMaquinaria().subscribe((data)=>{
      this.maquinarias=data;
    });

    this.produccionEmpleadoService.selectAreas().subscribe((data)=>{
      this.areas=data;
    });

    // this.produccionEmpleadoService.selectSalida().subscribe((data)=>{
    //   this.inventarios=data;
    // });

     //
     this.produccionEmpleadoService.selectInventarioSalida().subscribe((data)=>{
      this.inventariosSalida=data;
    })
  }

  cancelar() {
    this.router.navigateByUrl('/dashboard/produccion-empleado/produccionEmpleado');
  }

}
