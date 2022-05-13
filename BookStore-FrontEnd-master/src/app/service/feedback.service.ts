import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Feedback } from '../entity/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  baseUrl:string;
  constructor(private httpclient:HttpClient) {
    this.baseUrl=environment.baseUrl;
   }
   getall(): Observable<any>{
     return this.httpclient.get(this.baseUrl + '/getfeedback');
   }
   create(feedbackg: Feedback): Observable<any>{
     return this.httpclient.post(this.baseUrl + '/savefeedback' , feedbackg);
   }
   deletefeedback(feedbackid:number): Observable<any>{
     return this.httpclient.delete(this.baseUrl + '/deletefeed/' + feedbackid);
   }
}
