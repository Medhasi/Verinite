import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartServiceService {
  public cartItemsList: any = [];
  public productList: any = new BehaviorSubject<any>([]);
  constructor() {}
  getProducts() {
    return this.productList.asObservable();
  }
  setProduct(product: any) {
    this.cartItemsList.push(...product);
    this.cartItemsList = [...new Set(this.cartItemsList)];
    this.productList.next(product);
  }
  addtoCart(product: any) {
    this.cartItemsList.push(product);
    this.cartItemsList = [...new Set(this.cartItemsList)];
    this.productList.next(this.cartItemsList);
    this.cartItemsList = [...new Set(this.cartItemsList)];
    this.getTotalPrice();
  }
  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemsList.map((a: any) => {
      grandTotal = grandTotal + a.book_price * a.bookQty;
    });
    return grandTotal;
  }
  removeCartItems(product:any)
  {
    console.table(product);
      this.cartItemsList.map((a:any,index:any)=>
      {
        console.table(a);
        if(product.book_id==a.book_id)
        {
          this.cartItemsList.splice(index,1)
        }
      })
      this.productList.next(this.cartItemsList);
  }
  removeAll() {
    this.cartItemsList = [];
    this.productList.next(this.cartItemsList);
  }
}
