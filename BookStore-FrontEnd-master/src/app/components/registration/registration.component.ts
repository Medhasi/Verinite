import { Component, Input, OnInit } from '@angular/core';
import { Registration } from 'src/app/entity/registration';
import { RegistrationService } from 'src/app/service/registration.service';
import { ViewRegistrationComponent } from '../view-registration/view-registration.component';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { uniqueEmailvalidator } from '../UniqueEmailValidator.directive';
import { uniqueUsernamevalidator } from '../UniqueUsernameValidator.directive';



declare var $: any;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  addUser: any;
  @Input()
  registration: Registration = new Registration;
  iceEngNameExist: boolean = false;
  userrole: any;
  constructor(private service: RegistrationService, private router: Router,private route:ActivatedRoute)
   {
    this.route.queryParams.subscribe(role=>
      {
        this.userrole=role;
        console.log(this.userrole.UserRole)
      })
    }
  viewregister = ViewRegistrationComponent;
  registrations: Registration = new Registration();
  ngOnInit() {
    this.addUser = new FormGroup({
      "userName": new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z][ a-zA-Z0-9]*(?<! )$')],uniqueUsernamevalidator(this.service)),
      "mobileNumber": new FormControl(null, [Validators.required, Validators.pattern('^[1-9][0-9]{9}$')]),
      "emailaddress": new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")],uniqueEmailvalidator(this.service)),
      "password": new FormControl(null, [Validators.required, Validators.pattern('^(?=.*?[ A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,16}$')]),
      "confirmPassword": new FormControl(null, [Validators.required])

  },
 )
}


  register() {
    this.submitted = true;
    if (this.addUser.invalid ) {
      return this.addUser();
    }
    else {
      alert(this.userrole.UserRole)
      if(this.userrole.UserRole=='admin')
      {
        this.registrations.userRole=this.userrole.UserRole;
        this.service.registeradmin(this.registrations).subscribe((registrations) => {
           this.router.navigateByUrl('/view-registration')
         });
      }
      else
      {
        this.registrations.userRole=this.userrole.UserRole;
        this.service.registeruser(this.registrations).subscribe((registrations) => {
           this.router.navigate(['addCustomer',{email:registrations.emailaddress,mobileNumber:registrations.mobileNumber,id:registrations.registerId}]);
         });
      }
    
    }
  }

  submitted = false;


  get userName() {
    return this.addUser.get('userName');
  }

  get mobileNumber() {
    return this.addUser.get('mobileNumber');
  }

  get emailaddress() {
    return this.addUser.get('emailaddress');
  }

  get password() {
    return this.addUser.get('password');
  }

  get confirmPassword() {
    return this.addUser.get('confirmPassword');
  }




}
