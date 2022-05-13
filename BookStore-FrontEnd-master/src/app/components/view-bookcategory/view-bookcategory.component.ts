import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookCategory } from 'src/app/entity/book-category';
import { BookCategoryDto } from 'src/app/entity/book-category-dto';
import { BookCategoryService } from 'src/app/service/book-category.service';

@Component({
  selector: 'app-view-bookcategory',
  templateUrl: './view-bookcategory.component.html',
  styleUrls: ['./view-bookcategory.component.css']
})
export class ViewBookcategoryComponent implements OnInit {
  constructor(private route: ActivatedRoute,private router: Router,private bookservice:BookCategoryService) { }
  bookcat: BookCategory=new BookCategory();
  id!: number;
  ngOnInit(): void {
    this.bookcat = new BookCategory();

    this.id = this.route.snapshot.params['id'];
    
    this.bookservice.getcategory(this.id)
      .subscribe(data => {
        console.log(data)
        this.bookcat = data;
      
  });
  }
}
