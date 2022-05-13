import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Stock } from '../entity/stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  baseUrl: string;

  constructor(private httpclient: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }
  saveStock(stock: Stock): Observable<any>{
    return this.httpclient.post(this.baseUrl + '/stock/saveStock', stock);
  }
  saveStock1(bookId:any)
  {
    return this.httpclient.post(this.baseUrl + '/stock/saveStockWithbookId', bookId);
  }
  update(bookId:number,stock:Stock)
  {
    return this.httpclient.patch(this.baseUrl + '/stock/addquantity/bookId/'+ bookId,stock);
  }
  getStock(): Observable<any> {
    return this.httpclient.get(this.baseUrl+'/book/getBookwithStockDetails');
  }


}
