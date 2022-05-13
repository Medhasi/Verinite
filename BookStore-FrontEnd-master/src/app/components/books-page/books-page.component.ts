import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/entity/book';
import { Bookstockdto } from 'src/app/entity/bookstockdto';
import { CartServiceService } from 'src/app/service/cart-service.service';
import { HttpclientService } from 'src/app/service/httpclient.service';
import { StockService } from 'src/app/service/stock.service';

@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.css']
})
export class BooksPageComponent implements OnInit {
  @HostListener('contextmenu', ['$event'])
  onRightClick(event:any) {
  event.preventDefault();
  alert('rightclick is diabled ')
}

  books!: Array<Bookstockdto>;
  bookRecieved!: Array<Bookstockdto>;
  userRole!:any;
  listOfStocks!:Bookstockdto[];
  constructor(private router: Router,private stockservice:StockService, private httpClientService: HttpclientService,private cartService:CartServiceService) { }

  ngOnInit() {
    
    this.userRole=localStorage.getItem('userRole');
    this.stockservice.getStock()
    .subscribe((data) => {
      //console.log(data);
      this.listOfStocks = data;
     this.handleSuccessfulResponse(this.listOfStocks)
    })
  }

  addToCart(book:any)
  {
    if(book.bookQty<=book.quantity&&book.bookQty>0)
    {

    this.cartService.addtoCart(book);
    localStorage.setItem(book.bookId, book.bookQty);
    }
    else{
      alert("your quantity exceeds stock! avalible stock is "+book.quantity);
    }
  }

  handleSuccessfulResponse(response: Bookstockdto[]) {
    this.books = new Array<Bookstockdto>();
    //get books returned by the api call
    this.bookRecieved = response;

    for (const book of this.bookRecieved) {

      const userwithRetrievedImageField = new Bookstockdto();
      userwithRetrievedImageField.book_id = book.book_id;
      userwithRetrievedImageField.book_title = book.book_title;
      //populate retrieved image field so that book image can be displayed
     // console.log(book.pic_byte)
      userwithRetrievedImageField.retrieved_image = 'data:image/jpeg;base64,' + book.pic_byte;

      userwithRetrievedImageField.description = book.description;
      userwithRetrievedImageField.book_price = book.book_price;
      userwithRetrievedImageField.publisher_id = book.publisher_id;
      userwithRetrievedImageField.quantity=book.quantity;

      userwithRetrievedImageField.pic_byte = book.pic_byte;
      this.books.push(userwithRetrievedImageField);
    }
  }
  viewBook(bookId: number) {
    this.router.navigate(['viewBooks', bookId]);
  }
}
