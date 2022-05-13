import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Category } from '../entity/category';
import { postEntity } from '../entity/postEntity';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl: string;
  constructor(private httpclient: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  getCategorys(): Observable<any> {
    return this.httpclient.get(this.baseUrl + "/category/getAllCategorys");
  }
  getCategoryByName(name: string): Observable<any> {
    return this.httpclient.get(this.baseUrl + "/category/getCategory/byName/" + name);
  }
  getCategoryById(id: number): Observable<any> {
    return this.httpclient.get(this.baseUrl + "/category/getCategory/" + id);
  }
  saveCategory(postData: postEntity): Observable<any> {
    return this.httpclient.post(this.baseUrl + "/category/saveCategory", postData);
  }
  updateCategory(id: number, data: Category): Observable<any> {
    return this.httpclient.put(this.baseUrl + "/category/updateCategory/" + id, data);
  }
  deleteCategory(id: number): Observable<any> {
    return this.httpclient.delete(this.baseUrl + "/category/deleteCategory/" + id);
  }
}
