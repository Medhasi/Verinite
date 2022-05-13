import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/entity/book';
import { BookData } from 'src/app/entity/book-data';
import { BookService } from 'src/app/service/book.service';
import { HttpclientService } from 'src/app/service/httpclient.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-updatebook',
  templateUrl: './updatebook.component.html',
  styleUrls: ['./updatebook.component.css']
})
export class UpdatebookComponent implements OnInit {

  insertBook: any;
  imgURL: any;
  bookId!: number;
  books: BookData = new BookData();

  // @Input()
  // book: Book = new Book;

  @Output()
  bookAddedEvent = new EventEmitter();

  constructor(private httpClientService: HttpclientService,
    private router: Router,private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.bookId = this.route.snapshot.params['bookId']
    this.books.bookId = this.bookId;
    this.httpClientService.getBookByIddetails(this.bookId).subscribe(
      (data) =>{
        console.table(data)
       this.books = data;
      });

    this.insertBook = new FormGroup({
      "bookTitle": new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z][ a-zA-Z0-9]*(?<! )$')]),
      // "bookDiscription": new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z][ a-zA-Z0-9,.]*[.](?<![,()@])$'), Validators.minLength(6)]),
      "bookDiscription": new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z][ a-zA-Z0-9]*(?<! )$'), Validators.minLength(6)]),
      "bookPrice": new FormControl(null, [Validators.required, Validators.pattern('^[0-9][0-9]*.[0-9][0-9]$')]),
      // "image": new FormControl(null, [Validators.required])
    });
    window.addEventListener("beforeunload", function (e) {
      var confirmationMessage = "\o/";
      console.log("cond");
      e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
      return confirmationMessage;              // Gecko, WebKit, Chrome <34
  });

  }
  saveData() {
    this.submitted = true;
      if (this.insertBook.invalid) {
        return this.insertBook;
      }
      else {
        console.table(this.books)
      this.httpClientService.updateBook(this.books).subscribe((data) => this.books = data);
      this.router.navigateByUrl('/books')
        }
  }
  
  submitted = false;
  get bookTitle() { return this.insertBook.get('bookTitle'); }
  get bookDiscription() { return this.insertBook.get('bookDiscription'); }
  get bookPrice() { return this.insertBook.get('bookPrice'); }
}
