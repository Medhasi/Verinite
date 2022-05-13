import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeedbackService } from 'src/app/service/feedback.service';

@Component({
  selector: 'app-view-feedback',
  templateUrl: './view-feedback.component.html',
  styleUrls: ['./view-feedback.component.css']
})
export class ViewFeedbackComponent implements OnInit {

  feedback!: Array<any>;
  pageSettings!: { pageSizes: boolean; pageSize: number; };
  searchTerm!: string;
  temp = String;
  p: number = 1;
  count: number = 10;
  totallength!: number;
  page: number = 10;
  constructor(public feedbackservice:FeedbackService,private router:Router) {
    this.feedback = new Array<any>();
   
   }

  ngOnInit(): void {
    this.getfeedback();
    this.feedback= new Array<any>();
  }
  public getfeedback() {
    this.feedbackservice.getall().subscribe(data => {
      this.feedback= data;
      this.totallength=this.feedback.length;
    })
  }
  deletefeedback(feedbackid:number){
    alert("want's to delete the feedback");
    this.feedbackservice.deletefeedback(feedbackid).subscribe();
    this.router.navigateByUrl('/viewfeedback');
    //this.reloadCurrentRoute();
    this.reloadCurrentPage()
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }
  reloadCurrentPage() {
    window.location.reload();
   }

}
