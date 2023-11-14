import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { inject } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AvisoDialogComponent } from 'src/app/maquinas/aviso-dialog/aviso-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/maquinas/confirmation-dialog/confirmation-dialog.component'

import { ProduccionEmpleadoService } from '../produccion-empleado.service';

@Component({
  selector: 'app-produccion-empleado-create',
  templateUrl: './produccion-empleado-create.component.html',
  styleUrls: ['./produccion-empleado-create.component.css']
})
export class ProduccionEmpleadoCreateComponent implements OnInit {
  ngOnInit(): void {

    const usuario = localStorage.getItem("id_user");
    console.log('ID: ', usuario);

  }


}
