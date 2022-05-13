import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Book } from '../entity/book';
import { Bookstockdto } from '../entity/bookstockdto';
import { Orderbook } from '../entity/orderbook';

@Injectable({
  providedIn: 'root'
})
export class OrderBookService {
  save(paymentid:any,username:any,orderbook: Bookstockdto): Observable<any> {
    console.log("-------------------"+orderbook);
    return this.httpclient.post(`${this.baseUrl}/order/saveorder/`+paymentid+'/'+username,orderbook);
  }
  baseUrl: string;

  constructor(private httpclient: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  getOrderBook(username:any): Observable<any> {
    return this.httpclient.get(`${this.baseUrl}/order/Order-Book/username/`+username);
  }
  getOrder(): Observable<any> {
    return this.httpclient.get(`${this.baseUrl}/order/Order-Book`);
  }
  savePostEntity(savedata:any):Observable<any>{
    console.log("----------------------")
    console.log(savedata)
      return this.httpclient.post(`${this.baseUrl}/order/Order-Book`,savedata);
   }
  getOrderById(id: number): Observable<any> {
    return this.httpclient.get(`${this.baseUrl}/Order-Book/` + id);
  }
  // updateRecord(id:number,data:OrderBook):Observable<any>{
  //   return this._httpClient.put("http://localhost:9990/Order-Book/"+id,data);
  // }

  // searchByBook(bookName: String): Observable<any> {
  //   return this.httpclient.get(`${this.baseUrl}/Order-Book/bookName/` + bookName);
  // }

  searchByBook(text:String):Observable<any>{
    return this.httpclient.get(`${this.baseUrl}/Order-Book/search/`+text);
  }

}
