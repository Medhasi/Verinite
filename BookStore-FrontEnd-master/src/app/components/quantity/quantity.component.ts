import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/entity/book';
import { Stock } from 'src/app/entity/stock';
import { HttpclientService } from 'src/app/service/httpclient.service';
import { StockService } from 'src/app/service/stock.service';

@Component({
  selector: 'app-quantity',
  templateUrl: './quantity.component.html',
  styleUrls: ['./quantity.component.css']
})
export class QuantityComponent implements OnInit {

  @Input()
  book: Book = new Book;

  constructor(private service: HttpclientService, private router: Router, private route: ActivatedRoute,private stockser:StockService) { }

  bookIds!: number;
 // bookNew: Book = new Book();
 insertQuantity:any;
 @Input()
 stock : Stock=new Stock();

 //stock.bookTitle=book.bookTitle;
 title!:string;
  ngOnInit() {
    this.bookIds = this.route.snapshot.params['bookId']
    this.book.bookId = this.bookIds;

    //console.log(this.book.bookId);
    this.service.getBookByIddetails(this.book.bookId).subscribe(

      (data) =>

        this.book = data
       // this.title=this.book.bookTitle;

        );
        console.log(this.book);

       this. stock.bookId=this.book.bookId;
       //console.log(this.book.bookTitle);
       this.stock.bookTitle=this.book.bookTitle;
        this.insertQuantity = new FormGroup({
          "bookId":new FormControl(''),
          "bookTitle":new FormControl('',[Validators.required]),
          "quantity": new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+$')])});

  }

  submitted:boolean=false;
  get bookId()
  {
    return this.insertQuantity.get('bookId');
  }
   get bookTitle()
   {
     return this.insertQuantity.get('bookTitle');
  }
  get quantity()
  {
    return this.insertQuantity.get('quantity');
  }
  saveQuantity(titles:any)
  {
    console.log(titles);
    this.submitted=true;
    this.stock.bookTitle=titles;
    if(this.insertQuantity.invalid)
    return this.insertQuantity;
    else{
      //let title=localStorage.setItem('bookTitle',this.book.bookTitle);
     //console.log(title);
      this.stockser.update(this.stock.bookId,this.stock).subscribe((data) => {
        console.log(data);
        this.router.navigateByUrl('/books')
      });
    }

  }


}
