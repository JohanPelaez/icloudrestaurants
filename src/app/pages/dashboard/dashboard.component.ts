import { Component, OnInit } from '@angular/core';
import { IfoodServiceService } from '../../shared/ifood/ifood-service.service'
import { OrdersService } from 'src/app/shared/orders/orders.service';
import { AppsService } from 'src/app/shared/apps/apps.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

	constructor( 	private ifoodService: IfoodServiceService,
					private orderService: OrdersService,
					private appsService: AppsService ) { }

	ifoodCode = {
					'PLACED': 0,
					'INTEGRATED' : 1,
					'CONFIRMED': 2,
					'CANCELLED': 3,
					'DISPATCHED': 4,
					'DELIVERED': 5,
					'CONCLUDED': 6
				}
	protected ifoodToken;
	protected ifoodOrders = [];
	protected autoPull;
	protected orders = [];
	//protected orders = [];

	ngOnInit() {
		//this.getIfoodToken();
		this.autoPull = setInterval(() => {
			this.lookForOrders();
		}, 10000);	
	}
	ngOnDestroy() {
		clearInterval(this.autoPull);
	}

	/*getIfoodToken(): void{
		this.ifoodService.Authentication()
			.subscribe(data => {
				this.ifoodToken = data;
				this.lookForOrders();
			});
	}*/

	lookForOrders() {
		console.log('Hell')

		this.appsService.GetUserApps().subscribe(apps => {
			apps.forEach(app => {
				this.ifoodService.Authentication(
					app.client_id,
					app.client_secret,
					app.grant_type,
					app.username,
					app.password,
				)
					.subscribe(token => {
						this.ifoodService.LookForOrders(token.access_token)
							.subscribe(data => {
								this.getIfoodOrders(data, token.access_token);
						}, 
						error => console.log(error));
				});
			})

		})
		
	}

	getIfoodOrders(dat, tok) {
		dat.forEach(event => {
			if (this.orders.filter(order => order.reference == event.correlationId).length < 1 && this.ifoodCode[event.code] < 3) {
				this.ifoodService.GetOrder(event.correlationId, tok)
					.subscribe(data => {
						let order: Object = {};
						order = data;
						if (data.merchant.address.country == 'MX') {
							order['app'] = 'sin-delantal';
							order['d-channel'] = 'SinDelantal';
						} else {
							order['app'] = 'ifood';
							order['dChannel'] = 'iFood';
						}
						order['status'] = event.code;
						order['event-id'] = event.id;
						order['tok'] = tok;
						this.orders.push(order);
						if (this.ifoodCode[event.code] == 0) {
							this.integrateOrder(order);
						} else if (this.ifoodCode[event.code] == 1) {
							this.confirmOrder(order);
						}
					});
			} else if (this.ifoodCode[event.code] >= 3) {
				this.orders = this.orders.filter(o => this.ifoodCode[o.status] < 3);
			}
		});
	}
	cleanIfoodEvent(id) {
		this.ifoodService.CleanEvent(id, this.ifoodToken.access_token)
		.subscribe(data => {
		});
	}
	integrateOrder(order) {
		this.ifoodService.IntegrateOrder(order.reference, order.tok)
		.subscribe(data => {
			this.orders.filter(o => o.reference == order.reference)[0].status = "INTEGRATED";
			this.confirmOrder(order);
		});
	}
	confirmOrder(order) {
		console.log('holi');
		this.ifoodService.ConfirmOrder(order.reference, order.tok)
		.subscribe(data => {
			this.orders.filter(o => o.reference == order.reference)[0].status = "CONFIRMED";
			this.orderService.ConfirmOrder(order).subscribe();
		});
	}
	dispatchOrder(order) {
		this.ifoodService.DispatchOrder(order.reference, order.tok)
		.subscribe(data => {
			this.orders.filter(o => o.reference == order.reference)[0].status = "DISPATCHED";
			this.orders = this.orders.filter(o => o.status != "DISPATCHED");
			order['statusId'] = this.ifoodCode["DISPATCHED"];
			this.orderService.DispatchOrder(order).subscribe();
		});
	}
	cancelOrder(order) {
		this.ifoodService.CancelOrder(order.reference, order.tok)
		.subscribe(data => {
			this.orders.filter(o => o.reference == order.reference)[0].status = "CANCELLED";
			this.orders = this.orders.filter(o => o.status != "CANCELLED");
			order['statusId'] = this.ifoodCode["CANCELLED"];
			this.orderService.CancelOrder(order);
		});
	}
	orderSelected = {};
}
