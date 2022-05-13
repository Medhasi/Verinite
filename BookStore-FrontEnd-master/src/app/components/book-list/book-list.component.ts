import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Book } from 'src/app/entity/book';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpclientService } from 'src/app/service/httpclient.service';
// import { NgxPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  pageSettings!: { pageSizes: boolean; pageSize: number; };
  searchTerm!: string;
  temp = String;
  p: number = 1;
  count: number = 10;
  @Output()
  bookDeletedEvent = new EventEmitter();
  // deleteId: any;

  books: Array<Book> = [];
  booksRecieved: Array<Book> = [];
  selectedBook: any;
  action: string | undefined;
  response: any;
  book: Book = new Book;
  constructor(private httpClientService: HttpclientService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }
  ngOnInit() {
    this.refreshData();

  }

  refreshData() {
    this.httpClientService.getBooks().subscribe(
      response => this.handleSuccessfulResponse(response)
    );
    this.activatedRoute.queryParams.subscribe(
      (params) => {
        // this.action = params['action'];
        const bookId = params['bookId'];
        if (bookId) {
          this.selectedBook = this.books.find(book => book.bookId === +bookId);
        }
      }
    );
  }


  handleSuccessfulResponse(response: Book[]) {
    this.books = new Array<Book>();
    //get books returned by the api call
    this.booksRecieved = response;
    for (const book of this.booksRecieved) {

      const bookwithRetrievedImageField = new Book();
      bookwithRetrievedImageField.bookId = book.bookId;
      bookwithRetrievedImageField.bookTitle = book.bookTitle;
      //populate retrieved image field so that book image can be displayed
      bookwithRetrievedImageField.retrievedImage = 'data:image/jpeg;base64,' + book.picByte;
      bookwithRetrievedImageField.description = book.description;
      bookwithRetrievedImageField.bookPrice = book.bookPrice;
      bookwithRetrievedImageField.picByte = book.picByte;
      this.books.push(bookwithRetrievedImageField);
    }
  }



  addBook() {
    this.selectedBook = new Book();
    this.router.navigate(['addBooks'], { queryParams: { action: 'add' } });
  }

  viewBook(bookId: number) {
    this.router.navigate(['viewBooks', bookId]);
  }
  viewBook1(bookId: number) {
    console.log(bookId);
    this.router.navigate(['quantity', bookId]);
  }



  deleteBook(bookId: number) {
    alert("want's to delete the record");
    this.httpClientService.deleteBook(bookId).subscribe(
        (book) => {
          this.bookDeletedEvent.emit();
          this.reloadCurrentRoute();
          this.router.navigate(['books']);
        }
      );
      this.reloadCurrentRoute();

  }

  updateBook(bookId: number) {
    this.router.navigate(['updateBook', bookId]);
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }
}

