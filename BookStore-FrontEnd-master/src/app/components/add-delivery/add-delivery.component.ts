import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Delivery } from 'src/app/entity/delivery';
import { entityUserId } from 'src/app/entity/entityUserId';
import { DeliveryService } from 'src/app/service/delivery.service';
import { RegistrationService } from 'src/app/service/registration.service';

@Component({
  selector: 'app-add-delivery',
  templateUrl: './add-delivery.component.html',
  styleUrls: ['./add-delivery.component.css']
})
export class AddDeliveryComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  delivery: any;
  id!:any;
  @Input()
  deliverykg: Delivery = new Delivery();

  adddelivery = AddDeliveryComponent;
  submitted = false;
  name!:any;
  encAmount: any;
  constructor(private registerservice:RegistrationService, private deliveryservice: DeliveryService, private router: Router,private route:ActivatedRoute) { }
  deliverykga: Delivery = new Delivery;
  ngOnInit(): void {

    this.name=localStorage.getItem("username");

    this.registerservice.getUserCustemerid(this.name).subscribe(res=>{
      console.table(res);
      this.deliverykga.customerId=res[0].customer_id;

    })
    this.delivery = new FormGroup({
      "customername": new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z][ a-zA-Z0-9]*(?<! )$')]),
      "address1": new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z][ a-zA-Z0-9]*(?<! )$')]),
      "address2": new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z][ a-zA-Z0-9]*(?<! )$')]),
      "city": new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z][ a-zA-Z0-9]*(?<! )$')]),
      "state": new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z][ a-zA-Z0-9]*(?<! )$')]),
      "country": new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z][ a-zA-Z0-9]*(?<! )$')]),
      "pincode": new FormControl(null, [Validators.required, Validators.pattern('^-?[0-9][0-9,\.]*$')]),
    })
  }


  get customername() {
    return this.delivery.get('customername')
  }
  get address1() {
    return this.delivery.get('address1')
  }
  get address2() {
    return this.delivery.get('address2')
  }
  get city() {
    return this.delivery.get('city')
  }
  get state() {
    return this.delivery.get('state')
  }
  get country() {
    return this.delivery.get('country')
  }
  get pincode() {
    return this.delivery.get('pincode')
  }

  public save() {
    //this.delivery.customerId=this.id;

    this.submitted = true;
    if (this.delivery.invalid) {
      return this.delivery();
    }
    else {
      alert("Addedd")

      this.deliveryservice.create(this.deliverykga).subscribe((delivery) => {
        console.log(delivery)
        let va= localStorage.getItem("encammount");
        this.router.navigate(['/ordernow',va]);
      });


    }
  }
}
