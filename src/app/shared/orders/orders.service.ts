import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { orderObject } from '../orders/order';

@Injectable({
  providedIn: 'root'
})

export class OrdersService {
  protected URL = 'http://api.icloudrestaurants.com/order';

  constructor(protected http: HttpClient) { }

  public GetOrders() {
    //let headers = new HttpHeaders();
    //headers = headers.set('Authorization', 'Bearer ' + token);

    return this.http.get<orderObject[]>(this.URL);
  }

  public ConfirmOrder(order) {
    //let headers = new HttpHeaders();
    //headers = headers.append('Authorization', 'Bearer ' + token);
    let headers = new HttpHeaders();
    
    headers = headers.set('Content-Type', 'text/plain; charset=utf-8');

    return this.http.post<Object>(this.URL, order , {headers});
  }

  public DispatchOrder(order) {
    //let headers = new HttpHeaders();
    //headers = headers.append('Authorization', 'Bearer ' + token);
    let headers = new HttpHeaders();
    
    headers = headers.set('Content-Type', 'text/plain; charset=utf-8');

    return this.http.put<Object>(this.URL + '/' + order.reference, order, {headers});
  }

  public CancelOrder(order) {
    //let headers = new HttpHeaders();
    //headers = headers.append('Authorization', 'Bearer ' + token);
    let headers = new HttpHeaders();
    
    headers = headers.set('Content-Type', 'text/plain; charset=utf-8');

    return this.http.put<Object>(this.URL + '/' + order.reference, order, {headers});
  }
}
