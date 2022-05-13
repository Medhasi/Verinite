import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Publishers } from '../entity/publishers';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {
  baseUrl: string;

  constructor(private httpclint: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  getPublishers():Observable<any>
  {
    return this.httpclint.get(this.baseUrl + '/publishers/getAllPublishers')
  }
  getPublisherByName(name:string):Observable<any>
  {
    return this.httpclint.get(this.baseUrl + '/publishers/getAllPublishers');
  }
  getPublisherById(id:number):Observable<any>
  {
    return this.httpclint.get(this.baseUrl + '/publishers/getPublisher/'+id);
  }
  savePublisher(publisherData:Publishers):Observable<any>
  {
    return this.httpclint.post(this.baseUrl + '/publishers/savePublishers',publisherData);
  }

  updatePublisher(id:number,publisherData:Publishers):Observable<any>
  {
    return this.httpclint.put(this.baseUrl + '/publishers/updatePublishers/'+id,publisherData);
  }
  deletePublisher(id:number):Observable<any>
  {
    return this.httpclint.delete(this.baseUrl + '/publishers/deletePublishers/'+id);
  }
}
