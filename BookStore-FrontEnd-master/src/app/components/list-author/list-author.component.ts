import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Author } from 'src/app/entity/author';
import { AuthorService } from 'src/app/service/author.service';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-list-author',
  templateUrl: './list-author.component.html',
  styleUrls: ['./list-author.component.css']
})
export class ListAuthorComponent implements OnInit {
  pageSettings!: { pageSizes: boolean; pageSize: number; };
  searchTerm!: string;
  temp = String;
  p: number = 1;
  count: number = 10;
  constructor(private authorService: AuthorService, private router: Router) {
  }

  listOfAuthors!: Author[];
  deleteId: any;
  selectedAuthor: any;
  name:Author=new Author();

  // length = 500;
  // pageSize = 10;
  // pageIndex = 0;
  // pageSizeOptions = [5, 10, 25];
  // showFirstLastButtons = true;

  // handlePageEvent(event: PageEvent) {
  //   this.length = event.length;
  //   this.pageSize = event.pageSize;
  //   this.pageIndex = event.pageIndex;
  // }

  ngOnInit() {
    this.authorService.getAuthorList()
      .subscribe((data) => {
        this.listOfAuthors = data;
      })
  }


  //method to relaod a currentg Component
  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  delete(id: number) {
    alert("want's to delete this record");
    this.authorService.deleteAuthorById(id)
      .subscribe(
        data => {
          this.deleteId = data;

        }, error =>
        this.reloadComponent()
      )
  }


  // delete(id:number){
  //   this.authorService.deleteAuthorById(id).subscribe();
  //   this.reloadCurrentRoute();
  // }

  update(id: number) {
    this.router.navigate(['updateAuthor', id])
  }

  // search() {
  //   console.log(this.name.authorId);
  //   this.authorService.getById(this.name.authorId).subscribe(
  //     (response) => {
  //       this.listOfAuthors = response;
  //       console.log(response);
  //     }
  //   );

  // }

  addAuthor() {
    this.selectedAuthor = new Author();
    this.router.navigate(['addAuthor']);
  }

  search()
  {
    console.log(this.name.firstName);
    this.authorService.getByFirstName(this.name.firstName).subscribe(
      ( response) => {
        this.listOfAuthors=response;
        console.log(response);
       }
    );

  }
}