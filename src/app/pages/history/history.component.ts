import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { OrdersService } from 'src/app/shared/orders/orders.service';
import { orderObject } from 'src/app/shared/orders/order';
import { IfoodServiceService } from 'src/app/shared/ifood/ifood-service.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  statusCode = {
          2: 'CONFIRMED',
					3: 'CANCELLED',
					4: 'DISPATCHED',
  }
  statusColorCode = {
          2: 'blue',
          3: 'red',
          4: 'green',
  }
  appCode = {
          1: 'ifood'
  }
  displayedColumns: string[] = ['shortReference', 'customer', 'summary', 'status'];
  dataSource: MatTableDataSource<orderObject>;
  orderSelected = {};

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(  private orderService: OrdersService,
                private ifoodService: IfoodServiceService) { 
    // Create 100 users

    // Assign the data to the data source for the table to render
    this.orderService.GetOrders().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    })
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showOrder(orderRef) {
    this.ifoodService.Authentication()
			.subscribe(data => {
        let token = data['access_token'];
        this.ifoodService.GetOrder(orderRef, token).subscribe(data => {
          this.orderSelected = data;
        })
			});
  }
}
