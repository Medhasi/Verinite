import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { insertCustomer } from 'src/app/entity/customers';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  @Input()
  FirstName!: String;
  LastName!: String;
  MobileNumber!: number;
  EmailAddress!: String;
  Address!: String;
  City!: string;
  State!: String;
  Country!: boolean;
  Pincode!: String;
  RegId!: number;
  dataAccess: any;
  saveCustomer: any;
  id!:number;
  mobile!:number;
  email!:string;

  constructor(private customerService: CustomerService, private router: Router,private route: ActivatedRoute) { }

  insertCustomer: insertCustomer = new insertCustomer();
  ngOnInit() {
    this.route.params.forEach(element => {
      // this.id=element['id'];
      // console.log(this.id);
      // this.mobile=element['mobileNumber'];
      // console.log(this.mobile)
      // this.email=element['email'];
      // console.log(this.email)
      this.insertCustomer.emailAddress=element['email'];
      this.insertCustomer.mobileNumber=element['mobileNumber'];
      this.insertCustomer.regId=element['id'];


    });

    this.saveCustomer = new FormGroup({
      "firstName": new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z][ a-zA-Z]*(?<! )$')]),
      "lastName": new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z][ a-zA-Z]*(?<! )$')]),
      "mobileNumber": new FormControl(),
      "emailAddress": new FormControl(),
      "address": new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z][ a-zA-Z0-9]*(?<! )$')]),
      "state": new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z][ a-zA-Z]*(?<! )$')]),
      "city": new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z][ a-zA-Z]*(?<! )$')]),
      "country": new FormControl(null, [Validators.required, Validators.pattern('^[true]*[false]*')]),
      "pincode": new FormControl(null, [Validators.required, Validators.pattern('^[1-9][0-9]*(?<! )$')]),
      "regId": new FormControl(),
    });
  }

  get firstName() { return this.saveCustomer.get('firstName'); }
  get lastName() { return this.saveCustomer.get('lastName'); }
  get mobileNumber() { return this.saveCustomer.get('mobileNumber'); }
  get emailAddress() { return this.saveCustomer.get('emailAddress'); }
  get address() { return this.saveCustomer.get('address'); }
  get state() { return this.saveCustomer.get('state'); }
  get city() { return this.saveCustomer.get('city'); }
  get country() { return this.saveCustomer.get('country'); }
  get pincode() { return this.saveCustomer.get('pincode'); }
  get regId() { return this.saveCustomer.get('regId'); }




  submitted = false;


  addCustomer() {
    this.submitted = true;

    if (this.saveCustomer.valid) {

      this.customerService.saveCustomer(this.insertCustomer)
        .subscribe(
          success => {
            alert("Sussessfully Inserted")
            localStorage.setItem('custemerid','this.insertCustomer.customerId')
            this.router.navigate(['login']);

          },
          error => {
            alert("unsuccess")
            this.router.navigateByUrl('/addCustomer');

          }
        );

    }
    else {
      return this.saveCustomer;
    }

  }
  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['Customers']);
  }

}
