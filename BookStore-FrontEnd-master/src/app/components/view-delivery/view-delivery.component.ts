import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Delivery } from 'src/app/entity/delivery';
import { DeliverycustomerDto } from 'src/app/entity/deliverycustomer-dto';
import { Registration } from 'src/app/entity/registration';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { DeliveryService } from 'src/app/service/delivery.service';
import { RegistrationService } from 'src/app/service/registration.service';

@Component({
  selector: 'app-view-delivery',
  templateUrl: './view-delivery.component.html',
  styleUrls: ['./view-delivery.component.css']
})
export class ViewDeliveryComponent implements OnInit {
  delivery: Array<any>;

  pageSettings!: { pageSizes: boolean; pageSize: number; };
  searchTerm!: string;
  temp = String;
  p: number = 1;
  count: number = 10;
  totallength!: number;
  page: number = 10;
  deliverycustomer!:any;
  username!:any;
  registerEntity!:Registration;
  
  constructor(public deliveryservice: DeliveryService,private regiarerService:RegistrationService, private router: Router,public loginService:AuthenticationService) {
    this.delivery = new Array<any>()
  }
  ngOnInit(): void {
   this.username= localStorage.getItem('username');
    this.regiarerService.getUserbyUsername(this.username).subscribe(res=>{
      this.registerEntity=res;
      console.log( this.registerEntity)
      console.log( this.registerEntity.userRole)
      if(this.registerEntity.userRole=="admin")
      {
      this.deliveryservice.getall().subscribe(data => {
        this.deliverycustomer = data;
        this.totallength = this.delivery.length;
        console.log(data)
      })}
      else
      {
        this.deliveryservice.getallbasedonusername(this.username).subscribe(data => {
        this.deliverycustomer = data;
        this.totallength = this.delivery.length;
        console.log(data)
      })}
    });
   
    // this.deliverycustomer = new Array<any>();

  }
  
  updatedelivery(id: number) {
    this.router.navigate(['updatedelivery', id]);
  }
  
  getdeliveryby(id: number) {
    this.router.navigate(['deliveryby', id])
  }

  deletedelivery(id:number){
    alert("want's to delete the record");
    this.deliveryservice.deletedelivery(id).subscribe();
    this.reloadCurrentRoute();
  }
  
  // reloadCurrentRoute() {
  //   throw new Error('Method not implemented.');
  // }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }
}