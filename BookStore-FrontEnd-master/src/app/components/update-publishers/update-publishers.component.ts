import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Publishers } from 'src/app/entity/publishers';
import { PublisherService } from 'src/app/service/publisher.service';

@Component({
  selector: 'app-update-publishers',
  templateUrl: './update-publishers.component.html',
  styleUrls: ['./update-publishers.component.css']
})
export class UpdatePublishersComponent implements OnInit {

  publisher: Publishers=new Publishers();
  id!: number;
  constructor(private publisherService:PublisherService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.id=this.route.snapshot.params['id'];
    this.publisherService.getPublisherById(this.id).subscribe(
      data=>{
        this.publisher=data;
        console.log(this.publisher);
      })
  }
onUpdate()
{
  console.log("update")
  this.publisherService.updatePublisher(this.id,this.publisher).subscribe(
    data=>{
      this.router.navigate(['/publishers'])
    }

    );
}
}
