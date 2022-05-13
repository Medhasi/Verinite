import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { payment } from 'src/app/entity/payment';
import { PaymentsService } from 'src/app/service/payments.service';
import * as CryptoJS from 'crypto-js';
import { OrderBookService } from 'src/app/service/order-book.service';
import { Book } from 'src/app/entity/book';
import { CartServiceService } from 'src/app/service/cart-service.service';
import { Bookstockdto } from '../../entity/bookstockdto';
import { Orderbook } from '../../entity/orderbook';
import { Delivery } from 'src/app/entity/delivery';
import { DeliveryService } from 'src/app/service/delivery.service';
import { DeliverycustomerDto } from 'src/app/entity/deliverycustomer-dto';
import { RegistrationService } from 'src/app/service/registration.service';
import { Customers } from 'src/app/entity/customers';
import { entityUserId } from 'src/app/entity/entityUserId';
import { InvoiceService } from 'src/app/service/invoice.service';


@Component({
  selector: 'app-OrderNow',
  templateUrl: './OrderNow.component.html',
  styleUrls: ['./OrderNow.component.css'],
})
export class OrderNowComponent {
  order: any;
  selectedAddress!: DeliverycustomerDto;
  submitted: boolean = false;
  totalAmount!: any;
  a!: number;
  book: Bookstockdto = new Bookstockdto();
  decPassword: any = 'password';

  @Input()
  payment: payment = new payment();
  pay!: any;
  bob!: Customers;
  custemerid!: any;
  Lable!: entityUserId;
  see!: string;
  static CheckoutPart: any;
  decAmount!: any;
  encryptText: any;
  list!: any;
  name!: any;
  username!:any;
  products: any;
  grandTotal!: number;
  orderbook!: Orderbook;
  Id!: number;
  transactionId!: string;
  listdetails!: DeliverycustomerDto[];

  Title!: string;
  constructor(
    private invoice: InvoiceService,
    private route: ActivatedRoute,
    private cartService: CartServiceService,
    private service: PaymentsService,
    private orderser: OrderBookService,
    private delivaryser: DeliveryService,
    private registerservice: RegistrationService,
    private router: Router
  ) {}
  payment1: payment = new payment();
  userRole!: any;
  ngOnInit(): void {
    let user = localStorage.getItem('username');
    this.userRole=localStorage.getItem('userRole');
    if(this.userRole=='admin')
    {
      alert('you are logged in as a admin so you can`t order anything please login as user !')
    }
    this.delivaryser.getallbasedonusername(user).subscribe((res) => {
      this.listdetails = res;
      console.log(res);
    });
    this.payment1.amount = this.totalAmount;
    //this.payment.balance=this.totalAmount;
    this.payment.amount = this.totalAmount;

    this.decAmount = this.route.snapshot.params['amount'];
    localStorage.setItem('tt', 'this.decAmount');
    //this.payment.amount=this.decAmount;
    this.totalAmount = CryptoJS.AES.decrypt(
      this.decAmount.trim(),
      this.decPassword.trim()
    ).toString(CryptoJS.enc.Utf8);
    this.a = parseInt(this.totalAmount);
    // console.log(this.totalAmount)
    this.order = new FormGroup({
      address: new FormControl('', Validators.required),
      accountNumber: new FormControl('', Validators.required),
      customerName: new FormControl('', Validators.required),
      ifsc: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
    });
  }
  get address() {
    //console.log(this.selectedAddress);
    return this.order.get('address');
  }
  get accountNumber() {
    return this.order.get('accountNumber');
  }
  get customerName() {
    return this.order.get('customerName');
  }
  get ifsc() {
    return this.order.get('ifsc');
  }

  get amount() {
    return this.order.get('amount');
  }

  OrderNow(paid: any) {
    this.payment.amount = paid;
   this. username= localStorage.getItem('username');
    this.payment.username=this.username;

    this.submitted = true;
    if (this.order.valid) {
      this.service.savePayment(this.payment).subscribe((data) => {
        this.pay = data;

        this.see = this.pay.paymentStatus;
        this.transactionId = this.pay.transactionId;

        if (this.see == 'success') {
          alert('payment success');
          this.invoice
            .save(this.pay.paymentId,this.payment.amount, this.selectedAddress)
            .subscribe((res) => {});

          this.cartService.getProducts().subscribe((res: any) => {
            this.products = res;

            for (const object of this.products) {
              this.book.book_id = object.book_id;
              this.book.bookQty = object.bookQty;
              this.book.book_title = object.book_title;
              this.book.book_price = object.book_price;
              this.Id = object.book_id;
              //console.log("book Id "+this.Id);
              this.service
                .decreaseQuantity(object.book_id, this.book)
                .subscribe((res) => {});
              this.orderser
                .save(this.pay.paymentId,localStorage.getItem('username'), this.book)
                .subscribe((res) => {});
            }

            this.grandTotal = this.cartService.getTotalPrice();
          });
          // this.invoice.GenerateInvoicePdf(
          //   localStorage.getItem('username'),
          //   this.pay.paymentId
          // );
          alert('invoice generated')

          alert('order placed');
          this.router.navigateByUrl('/landingPage');
          this.cartService.removeAll();
        } else {
          alert('payment failure due to unavalibility of payment Services');
          this.router.navigateByUrl('/cart');
        }
      });
    } else {
      alert('fail');
      return this.order;
    }
  }
  cancel() {
    this.router.navigateByUrl('/');
  }

  CheckoutPart(total: any) {
    this.totalAmount = total;
    console.log(this.totalAmount);
  }
  addAddress() {
    this.router.navigateByUrl('/adddelivery');
  }
}
