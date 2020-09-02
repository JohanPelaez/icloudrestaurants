import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { orderObject } from '../orders/order';

@Injectable({
  providedIn: 'root'
})
export class AppsService {

  protected URL = 'http://api.icloudrestaurants.com/apps';

  constructor(protected http: HttpClient) { }

  public GetApps(restaurantId) {
    //let headers = new HttpHeaders();
    //headers = headers.set('Authorization', 'Bearer ' + token);

    return this.http.get<Object[]>(this.URL + '/' + restaurantId);
  }

  public GetUserApps() {
    //let headers = new HttpHeaders();
    //headers = headers.set('Authorization', 'Bearer ' + token);

    return this.http.get<AppStructure[]>(this.URL);
  }

  public CreateApp(app, restaurantId) {
    let headers = new HttpHeaders();
    
    headers = headers.set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.post<Response>(this.URL, {data: app, restaurantId: restaurantId}, {headers});
  }

  public UpdateApp(app) {
    let headers = new HttpHeaders();
    
    headers = headers.set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.put<Response>(this.URL + '/' + app.id, app, {headers});
  }
}

export interface Response {
  id: string;
  message: string;
}

export interface AppStructure {
  client_id: string;
  client_secret: string;
  grant_type: string;
  username: string;
  password: string;
}