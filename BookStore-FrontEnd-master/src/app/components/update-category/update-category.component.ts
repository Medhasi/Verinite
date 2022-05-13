import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/entity/category';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  id!: number;
  postData: Category = new Category();
  updateCategory: any;
  constructor(private apiservice: CategoryService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit() {


    this.updateCategory = new FormGroup({
      "categoryTitle": new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z][ a-zA-Z0-9]*(?<! )$')]),
    });
    this.id = this.route.snapshot.params['id'];
    this.apiservice.getCategoryById(this.id).subscribe(
      data => {
        this.postData = data;
      });
  }
  submited = false;
  get categoryTitle() { return this.updateCategory.get('categoryTitle'); }
  onSubmit() {
    if (this.updateCategory.valid) {
      this.apiservice.updateCategory(this.id, this.postData).subscribe(
        data => {
          // Swal.fire('Great','Successfully Updated','success');
          alert('Successfully Updated');
          this.redirectTo();
        }
        , error => {
          console.log(error);
        }
      );
    } else {
      return this.updateCategory;
    }



  }

  redirectTo() {
    console.log(1);
    this.router.navigate(['/categorys']);
  }

}
