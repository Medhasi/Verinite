import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BookCategory } from '../entity/book-category';
@Injectable({
  providedIn: 'root'
})
export class BookCategoryService {
  getbookall: any;
  baseUrl: string;

  constructor(private httpclient: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  getall(): Observable<any> {
    return this.httpclient.get(this.baseUrl + '/bookcategory');
  }
  create(bookcat: BookCategory): Observable<object> {
    return this.httpclient.post(this.baseUrl + '/bookcategory/', bookcat);
  }
  update(id: number, bookcat: BookCategory): Observable<any> {
    return this.httpclient.put(this.baseUrl + '/bookcategory/' + bookcat.id, bookcat);
  }
  getcategory(id: number): Observable<any> {
    return this.httpclient.get(this.baseUrl + '/bookcategory/' + id)
  }
  getalldata():Observable<any>{
    return this.httpclient.get(this.baseUrl + '/getalldata');
  }
}
