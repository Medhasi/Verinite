import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookCategory } from 'src/app/entity/book-category';
import { BookCategoryService } from 'src/app/service/book-category.service';

@Component({
  selector: 'app-update-bookcategory',
  templateUrl: './update-bookcategory.component.html',
  styleUrls: ['./update-bookcategory.component.css']
})
export class UpdateBookcategoryComponent implements OnInit {
  id!: number;
  bookcat!: BookCategory;
  constructor(private bookservice:BookCategoryService,private router:Router,
   private route: ActivatedRoute) { }
   submitted = false;
  ngOnInit() {
    this.bookcat= new BookCategory();
    this.id = this.route.snapshot.params['id'];
    // alert(this.id)
    this.bookservice.getcategory(this.id).subscribe(data =>{
      console.log(data)
      this.bookcat = data;
    },error => console.log(error));
    
  }
  onSubmit(){
    this.bookservice.update(this.id,this.bookcat).subscribe(data =>{
      this.getbook();
    }, error => console.log(error));
    
  }
getbook(){
  //this.router.navigate(['bookcategory'])
 this.router.navigateByUrl('/bookcategory')
}

}
