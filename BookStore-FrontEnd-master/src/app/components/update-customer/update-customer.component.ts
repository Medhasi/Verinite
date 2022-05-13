import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { insertCustomer } from 'src/app/entity/customers';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {
  edit: any;
  id!: number;
  updateCustomerValues: insertCustomer = new insertCustomer();
  constructor(private apiCall: CustomerService, private route: ActivatedRoute, private router: Router) { }
  insertCustomer: insertCustomer = new insertCustomer();

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.apiCall.getCustomerById(this.id).subscribe(
      data => {
        this.updateCustomerValues = data;
      });

    this.edit = new FormGroup({
      "firstName": new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z][ a-zA-Z]*(?<! )$')]),
      "lastName": new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z][ a-zA-Z]*(?<! )$')]),
      "mobileNumber": new FormControl(null, [Validators.required, Validators.pattern('^[1-9][0-9]*(?<! )$'), Validators.maxLength(10), Validators.minLength(10)]),
      "emailAddress": new FormControl(null, [Validators.required, Validators.pattern('^[a-z][ .@a-z0-9]*(?<! )$')]),
      "address": new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z][ a-zA-Z0-9]*(?<! )$')]),
      "state": new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z][ a-zA-Z]*(?<! )$')]),
      "city": new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z][ a-zA-Z]*(?<! )$')]),
      "country": new FormControl(null, [Validators.required, Validators.pattern('^[true]*[false]*')]),
      "pincode": new FormControl(null, [Validators.required, Validators.pattern('^[1-9][0-9]*(?<! )$'), Validators.maxLength(6), Validators.minLength(6)]),
      "regId": new FormControl(null, [Validators.required, Validators.pattern('^[0-9][0-9]*(?<! )$')]),
    });

  }
  get firstName() { return this.edit.get('firstName'); }
  get lastName() { return this.edit.get('lastName'); }
  get mobileNumber() { return this.edit.get('mobileNumber'); }
  get emailAddress() { return this.edit.get('emailAddress'); }
  get address() { return this.edit.get('address'); }
  get state() { return this.edit.get('state'); }
  get city() { return this.edit.get('city'); }
  get country() { return this.edit.get('country'); }
  get pincode() { return this.edit.get('pincode'); }
  get regId() { return this.edit.get('regId'); }

  // updateAuthor()
  // {
  //   this.apiCall.updateAuthor(this.id,this.updateData).subscribe(
  //    updata=> {
  //       this.updateData=updata;
  //       this.router.navigateByUrl('/home')

  //     });
  // }
  updateCustomer() {
    this.apiCall.update(this.id, this.updateCustomerValues)
      .subscribe((updata) => this.updateCustomerValues = updata);

    console.log(this.updateCustomerValues)
    alert("Updated Successfully")
    this.router.navigateByUrl('Customers')
  }
}
