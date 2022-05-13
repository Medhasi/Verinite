import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  baseUrl: string;

  constructor(private httpclient: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }
  save(payment:any,amount:any,delivary:any)
  {
    console.log(delivary);
    console.log(payment);
    return this.httpclient.post('http://localhost:8080/saveinvoice/'+payment+'/'+amount,delivary);
  }
  GenerateInvoicePdf(username:any,payment:any):Observable<any>
  {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/pdf');
    return this.httpclient.get(`http://localhost:8080/generateInvoice/`+username+'/'+payment, { headers: headers, responseType: 'blob' });
  }
  GetInvoiceDetails(username:any,payment:any):Observable<any>
  {
    return this.httpclient.get(`http://localhost:8080/frontEndInvoice/`+username+'/'+payment);
  }


}
