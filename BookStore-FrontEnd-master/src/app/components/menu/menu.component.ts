import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { CartServiceService } from 'src/app/service/cart-service.service';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router,public loginService:AuthenticationService,private cartService:CartServiceService)
  {
    
   }
  public totalItems:number=0;
  username!:any;
  userRole!:any;
  ngOnInit(): void {
    this.userRole=localStorage.getItem('userRole');
    this.username=localStorage.getItem('username');
    this.cartService.getProducts().subscribe((data: string | any[])=>
    {
      this.totalItems=data.length;
    })
    
  }

  reload() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/Author']);
  }
  reloadPage()
  {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/orders']);
  }
}
