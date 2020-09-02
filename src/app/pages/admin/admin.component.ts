import { Component, OnInit } from '@angular/core';
import { KitchensService } from 'src/app/shared/kitchens/kitchens.service';
import { RestaurantsService } from 'src/app/shared/restaurans/restaurants.service';
import { MatDialog } from '@angular/material/dialog';
import { NewKitchenComponent } from './modals/kitchen/new-kitchen/new-kitchen.component';
import { NewRestaurantComponent } from './modals/restaurant/new-restaurant/new-restaurant.component';
import { AppListComponent } from './modals/app-list/app-list/app-list.component';
import { AppsService } from 'src/app/shared/apps/apps.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  private Kitchens = [];
  private restaurants = [];
  private selected = {id : 0};
  constructor(  private kitchenService: KitchensService,
                private restauranService: RestaurantsService,
                private appsService: AppsService,
                public dialog: MatDialog) { 
    this.kitchenService.GetKitchens().subscribe(data => {
      this.Kitchens = data;
    })
  }

  ngOnInit() {
  }

  showRestaurants(kitchen) {
    this.restauranService.GetRestaurants(kitchen.id).subscribe(data => {
      this.restaurants = data;
      this.selected = kitchen;
    })
  }

  showApps(restaurantId) {
    this.appsService.GetApps(restaurantId).subscribe(data => {
      const dialogRef = this.dialog.open(AppListComponent, {
        width: '380px',
        data: {data: data, restaurantId: restaurantId}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          
        }
      });
    })
  }

  showNewKitchen() {
    const dialogRef = this.dialog.open(NewKitchenComponent, {
      width: '250px',
      data: {name: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.kitchenService.AddKitchen(result).subscribe(rs => {
          this.kitchenService.GetKitchens().subscribe(data => {
            this.Kitchens = data;
          })
        });
      }
    });
  }

  showNewRestaurant() {
    const dialogRef = this.dialog.open(NewRestaurantComponent, {
      width: '250px',
      data: {name: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.restauranService.AddRestaurant(result, this.selected.id).subscribe(rs => {
          this.restauranService.GetRestaurants(this.selected.id).subscribe(data => {
            this.restaurants = data;
          })
        });
      }
    });
  }
}
