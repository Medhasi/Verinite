import { Component, OnInit } from '@angular/core';
import { Bookstockdto } from 'src/app/entity/bookstockdto';
import { StockService } from 'src/app/service/stock.service';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent implements OnInit {

  listOfStocks!:Bookstockdto[];
  searchTerm!: string;
  temp = String;
  p: number = 1;
  count: number = 10;

  constructor(private stockservice:StockService) { }

  ngOnInit() {
    this.stockservice.getStock()
    .subscribe((data) => {
      console.log(data);
      this.listOfStocks = data;
    })
  }


}
