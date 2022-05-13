import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Publishers } from 'src/app/entity/publishers';
import { PublisherService } from 'src/app/service/publisher.service';

@Component({
  selector: 'app-add-publisher',
  templateUrl: './add-publisher.component.html',
  styleUrls: ['./add-publisher.component.css']
})
export class AddPublisherComponent  {

  @Input()
  publisher:Publishers=new Publishers();
  dataAccess: any;
  savePublisher: any;

  constructor(private publisherService: PublisherService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {

    this.savePublisher = new FormGroup({
      "publisherName": new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z][ a-zA-Z]*(?<! )$')]),
      "address": new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z][ a-zA-Z0-9]*(?<! )$')]),
      "state": new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z][ a-zA-Z]*(?<! )$')]),
      "city": new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z][ a-zA-Z]*(?<! )$')]),
      "country": new FormControl(null, [Validators.required, Validators.pattern('^[A-Za-z][ a-zA-Z]*(?<! )$')]),
      "pincode": new FormControl(null, [Validators.required, Validators.pattern('^[1-9][0-9]*(?<! )$')]),
    });
  }




  get publisherName() { return this.savePublisher.get('publisherName'); }

  get address() { return this.savePublisher.get('address'); }
  get state() { return this.savePublisher.get('state'); }
  get city() { return this.savePublisher.get('city'); }
  get country() { return this.savePublisher.get('country'); }
  get pincode() { return this.savePublisher.get('pincode'); }





  submitted = false;


  addPublisher() {
    this.submitted = true;
    console.log("yes")
    if (this.savePublisher.valid) {
      console.log(this.publisher)
      this.publisherService.savePublisher(this.publisher).subscribe(data=>
        {
          console.table(data);
          alert("inserted")
          window.close();
        });

    }
    else {
      return this.savePublisher;
    }

  }
  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['Customers']);
  }

}
