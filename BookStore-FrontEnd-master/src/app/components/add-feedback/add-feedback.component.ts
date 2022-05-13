import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Feedback } from 'src/app/entity/feedback';
import { FeedbackService } from 'src/app/service/feedback.service';

@Component({
  selector: 'app-add-feedback',
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.css']
})
export class AddFeedbackComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  feedback: any;
  @Input()
  feedbackg: Feedback = new Feedback();
  addfeedback = AddFeedbackComponent;
  submitted = false;
  constructor(private feedbackservice: FeedbackService, private router: Router) { }
  feedbackgg: Feedback = new Feedback;
  ngOnInit(): void {
    this.feedback = new FormGroup({
      "name": new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z][ a-zA-Z0-9]*(?<! )$')]),
      "email": new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$')]),
      // "suggestion": new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z][ a-zA-Z0-9]*(?<! )$')]),
      "scale": new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z][ a-zA-Z0-9]*(?<! )$')]),
      "comments": new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z][ a-zA-Z0-9]*(?<! )$')]),
    })
  }
  get name() {
    return this.feedback.get('name')
  }
  get email() {
    return this.feedback.get('email')
  }
  // get suggestion() {
  //   return this.feedback.get('suggestion')
  // }
  get scale() {
    return this.feedback.get('scale')
  }
  get comments() {
    return this.feedback.get('comments')
  }
 save() {
    this.submitted = true;
    if (this.feedback.invalid) {
      return this.feedback();
    }
    else {
      alert("user")
      this.feedbackservice.create(this.feedbackgg).subscribe((feedback: any) => {

        this.router.navigate(['/viewfeedback'])
      });


    }
  }

}
