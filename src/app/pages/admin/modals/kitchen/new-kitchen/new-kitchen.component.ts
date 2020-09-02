import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-kitchen',
  templateUrl: './new-kitchen.component.html',
  styleUrls: ['./new-kitchen.component.scss']
})
export class NewKitchenComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NewKitchenComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface DialogData {
  name: string;
}