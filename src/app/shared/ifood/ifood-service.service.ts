import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { orderObject } from '../orders/order';

@Injectable({
  providedIn: 'root'
})
export class IfoodServiceService {
  protected URLToken = 'https://pos-api.ifood.com.br/oauth/token';

  client_id = 'icloud';
  client_secret = 'eW9tKFc';
  grant_type = 'password';
  username = 'rodrigo.heredia@icloudrestaurants.com';
  password = 'B4hBAu2D.wmJjzF';
  merchant_id = '198886';

  constructor(protected http: HttpClient) { }

  public Authentication(client_id = this.client_id, client_secret = this.client_secret, grant_type = this.grant_type, username = this.username, password = this.password):Observable<Response> {
    //let headers = new HttpHeaders();
    //headers = headers.set('Content-Type', 'multipart/form-data');
    var data = new FormData();
    data.append("client_id", client_id);
    data.append("client_secret", client_secret);
    data.append("grant_type", grant_type);
    data.append("username", username);
    data.append("password", password);

    return this.http.post<Response>(this.URLToken, data);
  }

  public LookForOrders(token) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + token);

    return this.http.get<Array<any>>('https://pos-api.ifood.com.br/v1.0/events:polling',{headers});

  }

  public GetOrder(id, token) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + token);

    return this.http.get<orderObject>('https://pos-api.ifood.com.br/v2.0/orders/' + id,{headers});
  }

  public CleanEvent(id, token) {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token);
    headers = headers.append('Content-Type', 'application/json; charset=utf-8');

    return this.http.post<Object>('https://pos-api.ifood.com.br/v2.0/events/acknowledgment', [{id:id}],{headers});
  }

  public IntegrateOrder(id, token) {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token);

    return this.http.post<Object>('https://pos-api.ifood.com.br/v1.0/orders/' + id + '/statuses/integration', {}, {headers});
  }

  public ConfirmOrder(id, token) {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token);

    return this.http.post<Object>('https://pos-api.ifood.com.br/v1.0/orders/' + id + '/statuses/confirmation', {}, {headers});
  }

  public DispatchOrder(id, token) {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token);

    return this.http.post<Object>('https://pos-api.ifood.com.br/v1.0/orders/' + id + '/statuses/dispatch', {}, {headers});
  }

  public CancelOrder(id, token) {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + token);

    return this.http.post<Object>('https://pos-api.ifood.com.br/v2.0/orders/' + id + '/statuses/cancellationRequested', {}, {headers});
  }
}

export interface Response {
  access_token: string;
}