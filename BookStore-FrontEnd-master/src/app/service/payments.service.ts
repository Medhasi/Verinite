import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { payment } from '../entity/payment';
import { Book } from '../entity/book';
import { Bookstockdto } from '../entity/bookstockdto';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  
  baseUrl: string;

  constructor(private httpclient: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }
  savePayment(payment: payment) {
    return this.httpclient.post(`http://localhost:8080/order/postpayment`, payment);
  }
  getListByUsername(username: any): Observable<any> {
    return this.httpclient.get(`${this.baseUrl}/order/payments/allList/`+username);
  }

  getList(): Observable<any> {
    return this.httpclient.get(`${this.baseUrl}/order/payments/allList`);
  }
  getQuantity(id:number)
  {
    return this.httpclient.get(`${this.baseUrl}/stock/getstock/`+id);
  }
  decreaseQuantity(id:number,book:Bookstockdto)
  {
    //alert(book)
    //console.log(book);
    return this.httpclient.patch(`${this.baseUrl}/stock/decrease/`+id,book);
  }
   s!:string;
  DownloadInvoice(paymentid:any):Observable<any>
  {
    console.log(this.s=JSON.stringify(this.httpclient.get(`http://localhost:8080/downloadInvoice/`+paymentid)))
    return this.httpclient.get(`http://localhost:8080/downloadInvoice/`+paymentid);
  }


}
