import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { orderObject } from '../orders/order';

@Injectable({
  providedIn: 'root'
})

export class KitchensService {
  protected URL = 'http://api.icloudrestaurants.com/kitchen';

  constructor(protected http: HttpClient) { }

  public GetKitchens() {
    //let headers = new HttpHeaders();
    //headers = headers.set('Authorization', 'Bearer ' + token);

    return this.http.get<Object[]>(this.URL);
  }

  public AddKitchen(name) {
    let headers = new HttpHeaders();
    
    headers = headers.set('Content-Type', 'text/plain; charset=utf-8');
    let obj = {name: name};
    return this.http.post(this.URL, obj, {headers});
  }
}
