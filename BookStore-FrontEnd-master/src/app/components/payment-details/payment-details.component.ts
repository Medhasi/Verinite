
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// import { ExcelJson } from './interfaces/excel-json.interface';
import { Router } from '@angular/router';
import { payment } from 'src/app/entity/payment';
import { Registration } from 'src/app/entity/registration';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { PaymentsService } from 'src/app/service/payments.service';
import { RegistrationService } from 'src/app/service/registration.service';
import { XlsxServiceService } from 'src/app/service/xlsx-service.service';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {
  @ViewChild('paymentTable')
  paymentTable!: ElementRef;


  username!:any;
  
  registerEntity!:Registration;

  constructor(public loginService:AuthenticationService, private xl:XlsxServiceService, public service:PaymentsService,private router:Router,private regiarerService:RegistrationService) { }
  listPayment!:payment[];
  payment:payment=new payment();

  pageSettings!:{pageSizes:boolean;pageSize:number;};
  searchTerm!:string;
  temp=String;
  p:number=1;
  count:number=10;
  paymentList:Array<payment>=[];
  ngOnInit(): void {
    this.username= localStorage.getItem('username');
    this.regiarerService.getUserbyUsername(this.username).subscribe(res=>{
      this.registerEntity=res;
      console.log( this.registerEntity)
      console.log( this.registerEntity.userRole)
      if(this.registerEntity.userRole=="admin")
      {
    this.service.getList().subscribe(
      response=>{
        this.listPayment=response;
      }
    );
  }
  else{
    this.service.getListByUsername( this.username).subscribe(
      response=>{
        this.listPayment=response;
      }
    );
  }
}
);}
exportElmToExcel(): void {
  this.xl.exportTableElmToExcel(this.paymentTable, 'paymentTable');
}
}

  
  


