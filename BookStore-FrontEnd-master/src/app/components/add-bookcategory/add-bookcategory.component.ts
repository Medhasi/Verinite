import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookCategory } from 'src/app/entity/book-category';
import { BookCategoryService } from 'src/app/service/book-category.service';

@Component({
  selector: 'app-add-bookcategory',
  templateUrl: './add-bookcategory.component.html',
  styleUrls: ['./add-bookcategory.component.css']
})
export class AddBookcategoryComponent implements OnInit {

  bookcat:BookCategory = new BookCategory();
  submitted = false;
 
  constructor(private bookservice:BookCategoryService,private router:Router) { }

  ngOnInit() {
    
  }

  newBookcat(): void {
    this.submitted = false;
    this.bookcat = new BookCategory();
  }
  save() {
    this.bookservice
    .create(this.bookcat).subscribe(data => {
      console.log(data)
      this.bookcat = new BookCategory();
      
    }, 
    error => console.log(error));
  }
  OnSubmit() {
    this.submitted = true;
    this.save();  
    this.router.navigateByUrl('/bookcategory')  
  }
  

}
