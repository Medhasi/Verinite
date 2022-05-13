import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartServiceService } from 'src/app/service/cart-service.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products:any;
  grandTotal:any=0;
  encAmount!: string;
  encPassword: any="password";

  constructor(private cartService:CartServiceService,private router:Router) { }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe((res: any)=>
      {
        this.products=res;
        localStorage.setItem("cart", this.products);
        console.log(res);
        this.grandTotal=this.cartService.getTotalPrice();
      });

  }
  removeItem(book:any)
  {
    this.cartService.removeCartItems(book);
  }
  emptyCart()
  {
    this.cartService.removeAll();
  }
  checkout()
  {



    this.encAmount = CryptoJS.AES.encrypt(this.grandTotal.toString().trim(), this.encPassword.trim()).toString();

    localStorage.setItem("encammount",this.encAmount)
    // this.conversionDecryptOutput = CryptoJS.AES.decrypt(this.encryptText.trim(), this.decPassword.trim()).toString(CryptoJS.enc.Utf8);

  this.router.navigate(['ordernow',this.encAmount]);
  }

  totalMinus(price:number)
  {
  }


}
