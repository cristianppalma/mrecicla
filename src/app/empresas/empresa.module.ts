import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresaRoutingModule } from './empresa-routing.module';
import { EmpresaListComponent } from './empresa-list/empresa-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { EmpresaCreateComponent } from './empresa-create/empresa-create.component';
import { EmpresaEditComponent } from './empresa-edit/empresa-edit.component';


@NgModule({
  declarations: [
    EmpresaListComponent,
    EmpresaCreateComponent,
    EmpresaEditComponent
  ],
  imports: [
    CommonModule,
    EmpresaRoutingModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatMenuModule,
    MatBottomSheetModule,
    MatGridListModule,
    MatSelectModule,
    MatButtonModule,
    MatListModule,
    MatDialogModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EmpresaModule { }
