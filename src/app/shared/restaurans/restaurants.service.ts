import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { orderObject } from '../orders/order';

@Injectable({
  providedIn: 'root'
})

export class RestaurantsService {
  protected URL = 'http://api.icloudrestaurants.com/restaurant';

  constructor(protected http: HttpClient) { }

  public GetRestaurants(kitchentId) {
    //let headers = new HttpHeaders();
    //headers = headers.set('Authorization', 'Bearer ' + token);

    return this.http.get<Object[]>(this.URL + '/' + kitchentId);
  }

  public AddRestaurant(name, id) {
    let headers = new HttpHeaders();
    
    headers = headers.set('Content-Type', 'text/plain; charset=utf-8');
    let obj = {name: name, kitchen_id: id};
    return this.http.post(this.URL, obj, {headers});
  }
}
