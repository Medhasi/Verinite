import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Registration } from 'src/app/entity/registration';
import { User } from 'src/app/entity/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { RegistrationService } from 'src/app/service/registration.service';
import { HttpclientService } from 'src/app/service/httpclient.service';
import { emailvalidator } from '../mailValidator.directive';

@Component({
  selector: 'app-forgotPassword',
  templateUrl: './forgotPassword.component.html',
  styleUrls: ['./forgotPassword.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgot:any;
  @Input()
  registration: Registration = new Registration;


  constructor(private route: ActivatedRoute,private service:RegistrationService,
    private router: Router,
    ) { }

    user:Registration = new Registration();
  submitted=false;
  invalidLogin = false
  // username!:string;
  // passWord!:string
  // confirmPassWord:any
  msg!:string
  //registrations:Registration=new Registration();
  ngOnInit(): void {
      this.forgot=new FormGroup({
        "email":new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$')]),
        "password":new FormControl('',[Validators.required,Validators.pattern('^(?=.*?[ A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,16}$')]),
        "confirmPassWord":new FormControl('',Validators.required)
  });
  }



  get email(){
    return this.forgot.get('email');
  }

  get password(){
    return this.forgot.get('password');
  }
  get confirmPassWord()
  {
    return this.forgot.get('confirmPassWord');
  }
  update()
  {
    this.submitted = true;
    if(this.forgot.valid)
    {
      this.service.change(this.registration) .subscribe(
        registration=> {
          alert("Sussessfully Password Changed")
          this.router.navigate(['/login']);

        },
        error => {
          alert("please enter valid email address")
          this.router.navigate(['/forgotPassword']);

        }
      );
    }
    else{
      return this.forgot;
    }

  }
  cancel()
  {
    this.router.navigateByUrl('/login')
  }
}
