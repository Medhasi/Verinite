import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Delivery } from 'src/app/entity/delivery';
import { DeliveryService } from 'src/app/service/delivery.service';

@Component({
  selector: 'app-list-delivery',
  templateUrl: './list-delivery.component.html',
  styleUrls: ['./list-delivery.component.css']
})
export class ListDeliveryComponent implements OnInit {

  deliveryb!: Delivery;
  id!: number;
  constructor(private route: ActivatedRoute, private router: Router, private deliveryservice: DeliveryService) { }

  ngOnInit(): void {
    this.deliveryb = new Delivery();

    this.id = this.route.snapshot.params['id'];

    this.deliveryservice.getdelivery(this.id)
      .subscribe(data => {
        console.log(data)
        this.deliveryb = data;
      });
  }
}
