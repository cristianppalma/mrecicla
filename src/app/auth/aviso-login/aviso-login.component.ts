import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-aviso-login',
  templateUrl: './aviso-login.component.html',
  styleUrls: ['./aviso-login.component.css']
})
export class AvisoLoginComponent {
  constructor(
    public dialogRef: MatDialogRef<AvisoLoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}
  confirm(confirm: boolean): void {
    this.dialogRef.close(confirm);
  }
}
