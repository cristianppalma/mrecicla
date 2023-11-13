import { Component,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-aviso-error',
  templateUrl: './aviso-error.component.html',
  styleUrls: ['./aviso-error.component.css']
})
export class AvisoErrorComponent {
  constructor(
    public dialogRef: MatDialogRef<AvisoErrorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  confirm(confirm: boolean): void {
    this.dialogRef.close(confirm);
  }
}
