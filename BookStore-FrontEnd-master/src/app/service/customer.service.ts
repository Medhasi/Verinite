import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { insertCustomer } from '../entity/customers';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  baseUrl: string;
  constructor(private httpClient: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }
  allCustomers():Observable<any>{
    return this.httpClient.get(this.baseUrl + '/customers/customersList');
  }
  searchText(search:String):Observable<any>{
    return this.httpClient.get(this.baseUrl + '/customers/customers/search/'+search);
  }
  saveCustomer(customers:insertCustomer){
    return this.httpClient.post(this.baseUrl + '/customers/customers',customers);
  }
  update(id: number, data: insertCustomer):Observable<any>{
    return this.httpClient.put(this.baseUrl + '/customers/customers/'+id,data);
  }
  getCustomerById(id:number):Observable<any>{
    return this.httpClient.get(this.baseUrl + '/customers/customers/'+id);
  }
}