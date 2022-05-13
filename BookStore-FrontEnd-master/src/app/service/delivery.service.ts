import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Delivery } from '../entity/delivery';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
  
  baseUrl: string;
  constructor(private httpclient: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }
  getall(): Observable<any> {
    return this.httpclient.get(this.baseUrl + '/delivery/getalldelivery');
  }
  create(deliveryi: Delivery): Observable<any> {
    console.log(deliveryi)
    return this.httpclient.post(this.baseUrl + '/delivery/savedelivery/', deliveryi);
  }
  update(id: number, deliveryi: Delivery): Observable<any> {
    return this.httpclient.put(this.baseUrl + '/delivery/updatedelivery/' + id, deliveryi);
  }
  getdelivery(id: number): Observable<any> {
    return this.httpclient.get(this.baseUrl + '/delivery/viewDelivery/' + id);
  }
  deletedelivery(id: number): Observable<any> {
    return this.httpclient.delete(this.baseUrl + '/delivery/deletedelivery/' + id);
  }
  getallbasedonusername(username:any): Observable<any> {
    return this.httpclient.get(this.baseUrl + 'delivery/getAll/'+username);
  }
}
