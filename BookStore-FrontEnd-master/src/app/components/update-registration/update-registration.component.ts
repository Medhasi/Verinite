import { Component, OnInit } from '@angular/core';
import { Registration } from 'src/app/entity/registration';
import { RegistrationService } from 'src/app/service/registration.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-registration',
  templateUrl: './update-registration.component.html',
  styleUrls: ['./update-registration.component.css']
})
export class UpdateRegistrationComponent implements OnInit {

  constructor(private service: RegistrationService, private router: Router, private route: ActivatedRoute) { }
  registrationId!: number;
  registrations: Registration = new Registration();
  updateUsers: any
  submitted = false;
  ngOnInit() {
    this.registrationId = this.route.snapshot.params['registerId']
    this.registrations.registerId = this.registrationId;
    this.service.getUserById(this.registrationId).subscribe((data) => this.registrations = data);
    this.updateUsers = new FormGroup({
      "userName": new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z][ a-zA-Z0-9]*(?<! )$')]),
      "mobileNumber": new FormControl(null, [Validators.required, Validators.pattern('^-?[0-9][0-9,\.]*$')]),
      "emailaddress": new FormControl(null, [Validators.required, Validators.pattern('^[ A-Za-z0-9_@./#&+-]*$')]),
      "password": new FormControl(null, [Validators.required, Validators.pattern('^[ A-Za-z0-9_@./#&+-]*$')]),
      "confirmPassword": new FormControl(null, [Validators.required, Validators.pattern('^[ A-Za-z0-9_@./#&+-]*$')])

    })
  }

  update() {
    // alert(this.registeruser.registerId);
    this.submitted = true;
    if (this.updateUsers.invalid) {
      return this.updateUsers();
    }
    else {
      this.service.updateUser(this.registrations)
      .subscribe((data) => this.registrations = data);
      this.router.navigateByUrl('/view-registration')
    }
  }

  get userName() {
    return this.updateUsers.get('userName');
  }

  get mobileNumber() {
    return this.updateUsers.get('mobileNumber');
  }

  get emailaddress() {
    return this.updateUsers.get('emailaddress');
  }

  get password() {
    return this.updateUsers.get('password');
  }

  get confirmPassword() {
    return this.updateUsers.get('confirmPassword');
  }


}
