import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Insert } from 'src/app/entity/author';
import { AuthorService } from 'src/app/service/author.service';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css']
})
export class AddAuthorComponent implements OnInit {

  route: any;
  @Input()
  FirstName!: String;
  LastName!: String;
  dataAccess: any;
  saveAuthor!: any;

  constructor(private authorService: AuthorService, private router: Router) { }

  Insert: Insert = new Insert();
  ngOnInit() {
    this.saveAuthor = new FormGroup({
      "firstName": new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z][ a-zA-Z]*(?<! )$')]),
      "lastName": new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z][ a-zA-Z]*(?<! )$')]),
    });
  }
  get firstName() { return this.saveAuthor.get('firstName'); }
  get lastName() { return this.saveAuthor.get('lastName'); }
  submitted = false;
  insertAuthor() {
    this.submitted = true;
    if (this.saveAuthor.valid) {
      let Insert: Insert = {
        firstName: this.FirstName,
        lastName: this.LastName,
      };
      this.authorService.saveAuthor(this.Insert)
        .subscribe(
          success => window.close(),
          error => alert("unsuccess")
        );
      this.router.navigate(['home']);
    }
    else
      return this.saveAuthor;


  }
}
