import { Component, OnInit } from '@angular/core';
import { Registration } from 'src/app/entity/registration';
import { RegistrationService } from 'src/app/service/registration.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-registration',
  templateUrl: './show-registration.component.html',
  styleUrls: ['./show-registration.component.css']
})
export class ShowRegistrationComponent implements OnInit {

  constructor(private service: RegistrationService, private route: ActivatedRoute) { }
  registrationId!: number;
  registeruser: Registration = new Registration();
  ngOnInit() {
    this.registrationId = this.route.snapshot.params['registerId']
    this.registeruser.registerId = this.registrationId;
    // alert(this.registeruser.registerId);
    this.service.getUserById(this.registeruser.registerId).subscribe(
      (data) => this.registeruser = data);
    // alert(this.registeruser.userName);
  }

}
