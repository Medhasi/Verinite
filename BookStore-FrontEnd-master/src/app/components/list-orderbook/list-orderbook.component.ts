import { XlsxServiceService } from './../../service/xlsx-service.service';
import { RegistrationService } from './../../service/registration.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Orderbook } from 'src/app/entity/orderbook';
import { OrderBookService } from 'src/app/service/order-book.service';
import{PaymentsService}from 'src/app/service/payments.service';
import{invoiceEntity}from 'src/app/entity/invoiceEntity'
import{InvoiceService} from 'src/app/service/invoice.service'
import { saveAs } from 'file-saver';
import { Registration } from 'src/app/entity/registration';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-list-orderbook',
  templateUrl: './list-orderbook.component.html',
  styleUrls: ['./list-orderbook.component.css']
})
export class ListOrderbookComponent implements OnInit {
  @ViewChild('ordersTable')
  ordersTable!: ElementRef;
  pageSettings!: { pageSizes: boolean; pageSize: number; };
  searchTerm!: string;
  temp = String;
  p: number = 1;
  count: number = 10;
  invEntity!:string;
  username!:any;
  registerEntity!:Registration;
  orderBooks: Array<Orderbook> = [];
  // lstOrderBook: Orderbook=new Orderbook;
  // lstOrderBook: Array<Orderbook> = [];

  constructor(private xl:XlsxServiceService,public loginService:AuthenticationService,public orderbookService: OrderBookService,private regiarerService:RegistrationService, private router: Router,private pay: PaymentsService,private invservice:InvoiceService) { }
  lstOrderBook!: Orderbook[];
  order:Orderbook=new Orderbook();

  ngOnInit() {
    this.username= localStorage.getItem('username');
    this.regiarerService.getUserbyUsername(this.username).subscribe(res=>{
      this.registerEntity=res;
      console.log( this.registerEntity)
      console.log( this.registerEntity.userRole)
      if(this.registerEntity.userRole=="user")
      {
      this.orderbookService.getOrderBook(localStorage.getItem('username')).subscribe(
      response =>
        //  {
        //    console.log(response);
        //  }
        this.handleSuccessfulResponse(response)

    );
  }else{
    this.orderbookService.getOrder().subscribe( response =>
      //  {
      //    console.log(response);
      //  }
      this.handleSuccessfulResponse(response)

  );
  }
});}

  handleSuccessfulResponse(response: Orderbook[]) {
    this.lstOrderBook = response;
    //this.refresh();
  }
  totalAmount=localStorage.getItem('tt')

  search() {

    console.log(this.order.bookTitle);
    this.orderbookService.searchByBook(this.order.bookTitle).subscribe(
      (response: any[]) => {
        this.lstOrderBook = response;
      }
    );

  }
  refresh(): void {
    window.location.reload();
}

dowloadInvoice(paymentid:any)
{
  const username=localStorage.getItem('username');
  this.invservice.GenerateInvoicePdf(username,paymentid).subscribe(data=>
    {
      saveAs(data, localStorage.getItem('username')+`  `+paymentid+` invoice`+`.pdf`)
    });
    this.router.navigateByUrl('/frontInvoice/'+paymentid);
}
exportElmToExcel(): void {
  this.xl.exportTableElmToExcel(this.ordersTable, 'ordersTable');
}
}
