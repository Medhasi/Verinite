import { CategoryService } from './../../service/category.service';
import { PublisherService } from './../../service/publisher.service';
import { Publishers } from './../../entity/publishers';
import { Category } from './../../entity/category';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/entity/book';
import { HttpclientService } from 'src/app/service/httpclient.service';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StockService } from 'src/app/service/stock.service';
import { Stock } from 'src/app/entity/stock';
import { Author } from 'src/app/entity/author';
import { AuthorService } from 'src/app/service/author.service';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit {

  insertBook: any;
  selectedAuthor!:Author;
  selectedCategory!:Category;
  selectedPublisher!:Publishers;
  listAuthourdetails!:Author[];
  listCategoryDetatils!:Category[];
  listOfPublisherDetails!:Publishers[];
  private selectedFile: any;
  imgURL: any;
  id! :number;

  @Input()
  book: Book = new Book;

  newBook:Book=new Book;

  stock:Stock=new Stock;

  @Output()
  bookAddedEvent = new EventEmitter();
  baseUrl: string;
  flag!: boolean;

  constructor(private publisherService:PublisherService,private categoService:CategoryService,private httpClientService: HttpclientService,private stockser:StockService,private author:AuthorService,
    private router: Router, private httpClient: HttpClient
  ) { this.baseUrl = environment.baseUrl; }

  ngOnInit() {
   this.initAuthorData();
   this.initCategoryData();
   this.initPublisherData();
    this.insertBook = new FormGroup({
      "bookTitle": new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z][ a-zA-Z0-9]*(?<! )$')]),
      "bookDiscription": new FormControl(null, [Validators.required, Validators.minLength(6)]),
      "bookPrice": new FormControl(null, [Validators.required, Validators.pattern('^[0-9][0-9]*.[0-9][0-9]$')]),
      "authorName":new FormControl(null,Validators.required),
      "publisherId": new FormControl(null, [Validators.required]),
      "image": new FormControl(null, [Validators.required]),
      "categoryName":new FormControl(null,[Validators.required])
    });

  }
  initPublisherData() {
    this.publisherService.getPublishers().subscribe(pub=>
      {
        this.listOfPublisherDetails=pub;
      })
  }
  initCategoryData() {
    this.categoService.getCategorys().subscribe(cat=>
      {
        this.listCategoryDetatils=cat;
      })
  }


  initAuthorData()
  {
    this.author.getAuthorList().subscribe(res=>
      this.listAuthourdetails=res);
  }
  addAuthor()
  {
    this.router.navigateByUrl('/addAuthor');
  }
  addNewPublisher()
  {
    let x=window.open('addPublishers', '_blank', 'location=yes,height=920,width=900,scrollbars=no,status=yes'); 
  }
   
  addNewAuthor()
  {
    let x=window.open('addAuthor', '_blank', 'location=yes,height=920,width=900,scrollbars=no,status=yes'); 
  }
  addNewCategory()
  {
    let x=window.open('add-category', '_blank', 'location=yes,height=920,width=900,scrollbars=no,status=yes'); 
  }
  saveData() {

    this.submitted = true;
    this.book.authorId=this.selectedAuthor.authorId;
    this.book.categoryId=this.selectedCategory.categoryId;
    this.book.publisherId=this.selectedPublisher.publisherId;
    console.table(this.book)
    if (this.insertBook.valid) {
      alert("thank you");
      const uploadData = new FormData();
      uploadData.append('imageFile', this.selectedFile, this.selectedFile.name);
      this.selectedFile.imageName = this.selectedFile.name;
      this.httpClient.post(this.baseUrl + '/book/upload', uploadData, { observe: 'response' })
      .subscribe((response) => {
          if (response.status === 200) {
            this.httpClientService.addBook(this.book).subscribe(
              (data) => {
                // this.router.navigate(['admin', 'books']);
                this.book=data;
                console.log(this.book);
                this.stock.bookId=this.book.bookId;
                this.stock.bookTitle=this.book.bookTitle;
                console.log(this.book.bookId);
                this.stockser.saveStock(this.stock).subscribe(stock=>{});
               // this.stockser.saveStock1(this.book.bookId).subscribe(stock=>{});
                this.bookAddedEvent.emit();
                this.router.navigate(['books']);

              }
            );
            alert("Image uploaded successfully");
            console.log('Image uploaded successfully');
            //  this.stock.bookId=this.book.bookId;
            // this.stock.bookTitle=this.book.bookTitle;
            // this.stockser.saveStock(this.stock).subscribe(stock=>{});
          } else {
            console.log('Image not uploaded successfully');
          }
        }
        );


    }
    else {

      return this.insertBook;
    }
  }
  submitted = false;
  get bookTitle() { return this.insertBook.get('bookTitle'); }
  get bookDiscription() { return this.insertBook.get('bookDiscription'); }
  get bookPrice() { return this.insertBook.get('bookPrice'); }
  get publisherId() { return this.insertBook.get('publisherId'); }
  get image() { return this.insertBook.get('image'); }
  get authorName(){return this.insertBook.get('authorName');}
  get categoryName(){return this.insertBook.get('categoryName');}


  public onFileChanged(event: any) {
    console.log(event);
    this.selectedFile = event.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
    };

  }
}