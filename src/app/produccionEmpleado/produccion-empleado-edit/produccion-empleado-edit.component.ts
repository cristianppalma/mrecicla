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
  inventariosSalidas: any[];
  formularioProduccionAreaDetails: FormGroup;
  elID:any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private produccionEmpleadoService: ProduccionEmpleadoService,
  ){
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
      idproducto: [''],
      // idEmpleado: [''],
    });
  }

  ngOnInit(): any {

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
          idproducto: produccionArea.idproducto.toString(),
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

    this.produccionEmpleadoService.selectSalida().subscribe((data)=>{
      this.inventariosSalidas=data;
    });
  }

  cancelar() {
    this.router.navigateByUrl('/dashboard/produccion-empleado/produccionEmpleado');
  }

}
