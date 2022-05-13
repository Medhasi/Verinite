import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Insert } from '../entity/author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  baseUrl: string;

  constructor(private httpclient: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }
  getAuthorList(): Observable<any> {
    return this.httpclient.get(`${this.baseUrl}/author/authorList`);
  }
  getById(id: number): Observable<any> {
    return this.httpclient.get(`${this.baseUrl}/author/getAuthor/` + id);
  }
  deleteAuthorById(id: number): Observable<any> {
    return this.httpclient.delete(`${this.baseUrl}/author/deleteAuthor/` + id);
  }
  updateAuthor(authorId: number, data: Insert): Observable<any> {
    return this.httpclient.put(`${this.baseUrl}/author/updateAuthor/` + authorId, data);
  }
  saveAuthor(insert: Insert) {
    return this.httpclient.post(`${this.baseUrl}/author/saveAuthors`, insert);
  }
  getByFirstName(firstName:String):Observable<any>{
    return this.httpclient.get(`${this.baseUrl}/author/getAuthorByFirstName/`+firstName);
  }
}
