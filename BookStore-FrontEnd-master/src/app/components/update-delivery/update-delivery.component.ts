import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Delivery } from 'src/app/entity/delivery';
import { DeliveryService } from 'src/app/service/delivery.service';

@Component({
  selector: 'app-update-delivery',
  templateUrl: './update-delivery.component.html',
  styleUrls: ['./update-delivery.component.css']
})
export class UpdateDeliveryComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  delivery: any;
  @Input()
  deliverykg: Delivery = new Delivery();
  updatedelivery = UpdateDeliveryComponent;

  deliveryt!: Delivery;
  id: any;
  submitted = false;
  constructor(private deliveryservice: DeliveryService, private router: Router, private route: ActivatedRoute) { }
  deliverykga: Delivery = new Delivery();
  ngOnInit(): void {
    this.delivery = new FormGroup({
      "customername": new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z][ a-zA-Z0-9]*(?<! )$')]),
      "address1": new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z][ a-zA-Z0-9]*(?<! )$')]),
      "address2": new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z][ a-zA-Z0-9]*(?<! )$')]),
      "city": new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z][ a-zA-Z0-9]*(?<! )$')]),
      "state": new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z][ a-zA-Z0-9]*(?<! )$')]),
      "country": new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z][ a-zA-Z0-9]*(?<! )$')]),
      "pincode": new FormControl(null, [Validators.required, Validators.pattern('^-?[0-9][0-9,\.]*$')]),
    })
    this.deliveryt = new Delivery();
    this.id = this.route.snapshot.params['id'];
    // alert(this.id)
    this.deliveryservice.getdelivery(this.id).subscribe(data => {
      console.log(data)
      this.deliveryt = data;
    }, error => console.log(error));
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
  onSubmit() {
    // alert(this.id)
    this.submitted = true;

    if (this.delivery.invalid) {
      // alert(true)
      return this.delivery;
    }
    else {
      this.deliveryservice.update(this.id, this.deliveryt).subscribe((delivery) => {
        this.router.navigate(['/viewdelivery'])
      });
    }
  }
}

