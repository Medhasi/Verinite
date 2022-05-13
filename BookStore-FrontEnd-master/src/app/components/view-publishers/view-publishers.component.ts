import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Publishers } from 'src/app/entity/publishers';
import { PublisherService } from 'src/app/service/publisher.service';

@Component({
  selector: 'app-view-publishers',
  templateUrl: './view-publishers.component.html',
  styleUrls: ['./view-publishers.component.css']
})
export class ViewPublishersComponent implements OnInit {

  pageSettings!: { pageSizes: boolean; pageSize: number; };
  searchTerm!: string;
  temp = String;
  p: number = 1;
  count: number = 10;
  
  publisherDetails!: Publishers[];
  constructor(private publisherService:PublisherService,private router:Router){ }
  ngOnInit(){
    this.publisherService.getPublishers().subscribe(
      data=>{
          this.publisherDetails=data;
          console.log(this.publisherDetails)
      })

  }
  updatePublisher(id:number)
  {
    console.log(id);
    this.router.navigate(['/updatePublisher',id]);
  }
  DeletePublisher(id:number)
  {
    if (confirm('Are You Sure ,do you want to delete ')) {

    this.publisherService.deletePublisher(id).subscribe(
      data=>{
          alert("successfully Deleted ")
          this.reloadComponent();
      },
      error=>
      {
        alert("successfully Deleted ")
        this.reloadComponent();
        console.log(error)
      })
    }
  }
  search(name:string)
  {

  }
  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }

}
