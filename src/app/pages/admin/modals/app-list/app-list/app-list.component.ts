import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppsService } from 'src/app/shared/apps/apps.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.scss']
})
export class AppListComponent implements OnInit {

  private apps;

  constructor(  public dialogRef: MatDialogRef<AppListComponent>,
                private appsService: AppsService,
                private _snackBar: MatSnackBar,
                @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    this.apps = this.data.data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  update(app) {
    this.appsService.UpdateApp(app).subscribe(data => {
      if (data.id) {
        this._snackBar.open('The credential was Updated!!', 'Close', {
          duration: 2000,
        });
      } else {
        this._snackBar.open(data.message, 'Close', {
          duration: 2000,
        });
      }
    });
  }

  create(app) {
    this.appsService.CreateApp(app, this.data.restaurantId).subscribe(data => {
      if (data.id) {
        this._snackBar.open('The credential was saved!!', 'Close', {
          duration: 2000,
        });
      } else {
        this._snackBar.open(data.message, 'Close', {
          duration: 2000,
        });
      }
    });
  }

}

export interface DialogData {
  data: Object;
  restaurantId: string;
}