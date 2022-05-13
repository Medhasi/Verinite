import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/entity/category';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent {
  pageSettings!: { pageSizes: boolean; pageSize: number; };
  searchTerm!: string;
  temp = String;
  p: number = 1;
  count: number = 10;
  //Object to hold a data
  categoryList!: Category[];
  constructor(private apiService: CategoryService, private router: Router) { }
  ngOnInit() {
    this.getCategorys();

  }
  //method to get a data from a Api
  private getCategorys() {
    return this.apiService.getCategorys().subscribe(
      data => {
        this.categoryList = data;
        console.log(data);
      }

    );

  }
  //Method to update a category data
  updateCategory(id: number) {
    this.router.navigate(["/updateCategory", id])
  }

  //Method to delete a category
  deleteCategory(id: number) {
    this.apiService.deleteCategory(id).subscribe(
      data => {
        alert('successfully saved ')
        //  Swal.fire(
        //    'Deleted!',
        //    'Your file has been deleted.',
        //    'success'
        //  )
        this.reloadComponent();
      }, error => {
      alert('saved succesfully')
      //  Swal.fire(
      //    'Deleted!',
      //    'Your file has been deleted.',
      //    'success'
      //  )
      this.reloadComponent();
    }

    )
  }
  //method to redirect to a specific Component
  redirectTo() {
    console.log(1);
    this.router.navigate(['/categorys']);
  }

  //method to relaod a current Component
  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  //Method for Conformation Dialog
  Deletemessage(id: number) {
    //  Swal.fire({
    //    title: 'Are you sure?',
    //    text: "You won't be able to revert this!",
    //    icon: 'warning',
    //    showCancelButton: true,
    //    confirmButtonColor: '#3085d6',
    //    cancelButtonColor: '#d33',
    //    confirmButtonText: 'Yes, delete it!'
    //  }).then((result) => {
    //    if (result.isConfirmed) {
    //     this.deleteCategory(id)
    //    }
    //  })
    if (confirm('Are You Sure ,do you want to delete ')) {
      this.deleteCategory(id);
    }
  }
}
