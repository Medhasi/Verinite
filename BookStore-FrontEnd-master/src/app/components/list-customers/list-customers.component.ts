import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customers } from 'src/app/entity/customers';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.css']
})
export class ListCustomersComponent implements OnInit {
  pageSettings!: { pageSizes: boolean; pageSize: number; };
  searchTerm!: string;
  temp = String;
  p: number = 1;
  count: number = 10;

  constructor(private customerService: CustomerService, private router: Router) { }
  listOfCustomers!: Customers[];
  name: Customers = new Customers();
  selectedCustomers: any;

  ngOnInit() {
    this.customerService.allCustomers()
      .subscribe((data: any[]) => {
        this.listOfCustomers = data;
      })
  }
  search() {
    console.log(this.name);
    this.customerService.searchText(this.name.firstName).subscribe(
      (response) => {
        this.listOfCustomers = response;
        console.log(response);
      }
    );
  }
  update(Id: number) {
    this.router.navigate(['updateCustomer', Id])

  }
  addCustomer() {
    this.selectedCustomers = new Customers();
    this.router.navigate(['addCustomer']);
  }
}
