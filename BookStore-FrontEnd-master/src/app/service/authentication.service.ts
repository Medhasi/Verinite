import { Registration } from 'src/app/entity/registration';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl:string;
  constructor(private httpclient:HttpClient) { 
    this.baseUrl = environment.baseUrl;

  }
  userDetails!: Registration;
  login(userName: string):Observable<any>{
    return this.httpclient.get(this.baseUrl+'/registration/login/'+userName);
  }
  logOut() {
    localStorage.removeItem("username");
    localStorage.removeItem('userRole');
  
  }

  getUserRole()
  {
    if(localStorage.getItem('userRole')=="admin")
    {
      return true;
    }
    return false;
  }

  isUserLoggedIn() {
    let user = localStorage.getItem("username");    
    if (user === null) return false
    return true
  }
}