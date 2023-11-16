import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AvisoDialogComponent } from 'src/app/maquinas/aviso-dialog/aviso-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/maquinas/confirmation-dialog/confirmation-dialog.component'

@Component({
  selector: 'app-produccion-create',
  templateUrl: './produccion-create.component.html',
  styleUrls: ['./produccion-create.component.css']
})
export class ProduccionCreateComponent {

}
