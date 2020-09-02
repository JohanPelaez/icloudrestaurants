import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HistoryComponent } from './pages/history/history.component';
import { AdminComponent } from './pages/admin/admin.component';
import { MaterialModule } from './shared/material-components.module';
import { IfoodServiceService } from './shared/ifood/ifood-service.service';

import { HttpClientModule } from '@angular/common/http'; 
import { OrdersService } from './shared/orders/orders.service';
import { KitchensService } from './shared/kitchens/kitchens.service';
import { RestaurantsService } from './shared/restaurans/restaurants.service';
import { NewKitchenComponent } from './pages/admin/modals/kitchen/new-kitchen/new-kitchen.component';
import { FormsModule } from '@angular/forms';
import { NewRestaurantComponent } from './pages/admin/modals/restaurant/new-restaurant/new-restaurant.component';
import { AppListComponent } from './pages/admin/modals/app-list/app-list/app-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HistoryComponent,
    AdminComponent,
    NewKitchenComponent,
    NewRestaurantComponent,
    AppListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule
  ],
  entryComponents: [NewKitchenComponent, NewRestaurantComponent, AppListComponent],
  providers: [IfoodServiceService, OrdersService, KitchensService, RestaurantsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
