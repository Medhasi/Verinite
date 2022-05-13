import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Registration } from 'src/app/entity/registration';
import { User } from 'src/app/entity/user';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AuthenticationService
  ) {}
  form: any;
  user: Registration = new Registration();
  submitted = false;
  invalidLogin = false;
  username!: string;
  passWord!: string;
  msg!: string;
  registration: Registration = new Registration();
  ngOnInit(): void {
    this.form = new FormGroup({
      userName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-z][ a-zA-Z0-9]*(?<! )$'),
      ]),
      password: new FormControl('', Validators.required),
    });
  }
  get userName() {
    return this.form.get('userName');
  }

  get password() {
    return this.form.get('password');
  }
  checkLogin() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    } else {
      this.user = new Registration();
      this.service.login(this.username).subscribe((response) => {
        console.table(response)
        this.user = response;
        if (this.user.password == this.passWord) {
          localStorage.setItem('username', this.username);
          localStorage.setItem('userRole', this.user.userRole);
          if (this.user.userRole == 'admin') {
            this.router.navigate(['books']).then(() => {
              window.location.reload();
            });;
          } else {
            
            this.router.navigate(['landingPage'])
            .then(() => {
              window.location.reload();
            });
           
          }
        } else {
          this.msg = 'Opps! Username or password is incorrect';
          this.form;
        }
      });
    }
  }
}
