import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/entity/category';
import { postEntity } from 'src/app/entity/postEntity';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  category:Category=new Category();
  postData:postEntity=new postEntity();
  addCategory:any;
    constructor(private _apiservice:CategoryService,private router:Router,private route: ActivatedRoute) { }
    ngOnInit() {
      this.addCategory=new FormGroup({
        // "categoryTitle":new FormControl(null,[Validators.required,Validators.pattern('^[A-Za-z][ a-zA-Z]*(?<! )$')]),
        "categoryTitle":new FormControl(null,[Validators.required]),

       });
    }
    onSubmit()
    {
      if(this.addCategory.valid)
      {

      console.log(this.postData);
      this._apiservice.saveCategory(this.postData).subscribe(
        data=>
        {
          this.category=data;
          // Swal.fire('Great','Successfully Saved','success');
          alert('successfully Saved ')
          window.close();
        
        },
        error=>
        {
          // Swal.fire('Great','Successfully Saved','success');
          alert('Saved Successfully')
        window.close()
        },
      );
      }
      else
      {
        return this.addCategory;
      }

    }
    submited=false;
    get categoryTitle(){return this.addCategory.get('categoryTitle');}
    redirectTo()
    {
      console.log(1);
      this.router.navigate(['/categorys']);
    }

  }
