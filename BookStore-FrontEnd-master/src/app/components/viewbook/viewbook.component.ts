import { Bookdto } from './../../entity/bookdto';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/entity/book';
import { HttpclientService } from 'src/app/service/httpclient.service';

@Component({
  selector: 'app-viewbook',
  templateUrl: './viewbook.component.html',
  styleUrls: ['./viewbook.component.css']
})
export class ViewbookComponent implements OnInit {


  @Input()
  book: Bookdto = new Bookdto;

  constructor(private service: HttpclientService, private route: ActivatedRoute) { }

  bookIds!: number;
  bookNew: Bookdto = new Bookdto();


  ngOnInit() {
    this.bookIds = this.route.snapshot.params['bookId']
    this.book.book_id = this.bookIds;
    
    this.service.getBookById(this.book.book_id).subscribe(
      (data) =>{
        this.book = data[0];
        this.book.retrieved_image='data:image/jpeg;base64,' + data[0].pic_byte;
        console.table(this.book);
      }
        
        );
  }

}
