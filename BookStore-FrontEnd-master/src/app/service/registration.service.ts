import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Registration } from '../entity/registration';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  baseUrl: string;
userrole:any;
  constructor(private httpclient: HttpClient, private activatedroute: ActivatedRoute) {
    this.baseUrl = environment.baseUrl;

    
  }
  
  registeradmin(registrations: Registration):Observable<any> {
    return this.httpclient.post(this.baseUrl + '/registration/saveRegistrations', registrations);
  }
  getRegisterUser() {
    return this.httpclient.get<Registration>(this.baseUrl + '/registration/getAllRegistration')
  }
  
  registeruser(registrations: Registration): Observable<any> {
    return this.httpclient.post(this.baseUrl + '/registration/saveRegistrations', registrations);
  }

  deleteUser(registerId: number) {
    return this.httpclient.delete(this.baseUrl + '/registration/deleteRegistration/' + registerId);
  }

  updateUser(registeruser: Registration): Observable<any> {
    return this.httpclient.put(this.baseUrl + '/registration/updateRegistration/' + registeruser.registerId, registeruser);
  }
  change(registeruser: Registration): Observable<any> {
    return this.httpclient.patch(this.baseUrl +'/registration/changepasword',registeruser);
  }
  getUserById(registrationId: number): Observable<any> {
    return this.httpclient.get(this.baseUrl + '/registration/getRegistration/' + registrationId,);
  }
  getUserbyEmail(email:String):Observable<any>
  {
    //alert(email);
    return this.httpclient.get(this.baseUrl+'/registration/check-mail/'+email);
  }
  getUserbyUsername(username:String):Observable<any>
  {
    //alert(email);
    return this.httpclient.get(this.baseUrl+'/registration/check-username/'+username);
  }
  getUserCustemerid(username:any):Observable<any>
  {
    return this.httpclient.get(this.baseUrl+'registration/getAll/'+username);
  }

}
