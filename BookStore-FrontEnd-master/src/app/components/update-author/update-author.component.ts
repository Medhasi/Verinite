import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Insert } from 'src/app/entity/author';
import { AuthorService } from 'src/app/service/author.service';

@Component({
  selector: 'app-update-author',
  templateUrl: './update-author.component.html',
  styleUrls: ['./update-author.component.css']
})
export class UpdateAuthorComponent implements OnInit {

  id!: number;
  updateData: Insert = new Insert();
  edit!: any;
  constructor(private apiCall: AuthorService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.apiCall.getById(this.id).subscribe(
      data => {
        this.updateData = data;
      });
    this.edit = new FormGroup({
      "firstName": new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z][ a-zA-Z]*(?<! )$')]),
      "lastName": new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z][ a-zA-Z]*(?<! )$')]),
    });
  }
  get firstName() { return this.edit.get('firstName'); }
  get lastName() { return this.edit.get('lastName'); }

  updateAuthor() {
    this.apiCall.updateAuthor(this.id, this.updateData)
      .subscribe((updata) => this.updateData = updata);
    this.router.navigateByUrl('home')
    alert("Updated Successfully")
  }
}

