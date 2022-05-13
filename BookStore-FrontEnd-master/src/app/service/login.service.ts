import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  login(username: string, password: string):Observable<any> {
    throw new Error('Method not implemented.');
  }
  baseUrl!: string;
  constructor(private httpclient: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }
}
