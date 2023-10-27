import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import {MatNativeDateModule} from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {NgIf} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
interface Area {
  value: string;
  viewValue: string;
}

export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-solicitudes-edit',
  templateUrl: './solicitudes-edit.component.html',
  styleUrls: ['./solicitudes-edit.component.css']
})
export class SolicitudesEditComponent {
 
  Areas: Area[] = [
    {value: 'area1', viewValue: 'telares'},
    {value: 'area2', viewValue: 'hilado'},
    {value: 'area3', viewValue: 'otro'},
  ];

  constructor(private router:Router, private _bottomSheet: MatBottomSheet,public dialog: MatDialog) {}


  SolicitudReturn()
  {
    this.router.navigateByUrl('/dashboard/solicitudes/solicitudes');
  } 
    /**
    boton de abrir imagen
    */
  openBottomSheet(): void 
  {
    this._bottomSheet.open(BottomSheetOverviewExampleSheet);
  }
  
}

export class BottomSheetOverviewExampleSheet {
  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
    /**
    boton de abrir imagen
    */
    @Component({
      selector: 'dialog-overview-example-dialog',
      templateUrl: 'dialog.component.html',
      standalone: true,
      imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
    })
    export class DialogOverviewExampleDialog {
      constructor(
        public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
      ) {}
    
      onNoClick(): void {
        this.dialogRef.close();
      }
    }

    