
import { ActivatedRoute } from '@angular/router';
import { InvoiceService } from 'src/app/service/invoice.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jspdf, { jsPDF } from 'jspdf';
import { FrontEndDto } from 'src/app/entity/frontEndDto';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private invService:InvoiceService,private route:ActivatedRoute) { }
  frontInvoiceData!:FrontEndDto[];
  frontend!: FrontEndDto[];
  username!:any;
  paymentId!:any;
  count:number=0;
  //Some Common Details
  amount!:number;
  name!:string;
  invNo!:string;
  ordDate!: Date;
  mob!:string;
  address!: string;
  city!:string;
  country!: string;
  state!: string;
  pincode!: string;

  ngOnInit(): void {
    this.paymentId=this.route.snapshot.params['paymentId'];
    this.username=localStorage.getItem('username');
    this.invService.GetInvoiceDetails(this.username,this.paymentId).subscribe(data=>{
      this.frontInvoiceData=data;
     this.name=data[0].customer_name;
     this.amount=data[0].amount;
     this.ordDate=data[0].ordered_date;
     this.mob=data[0].mobile_number;
     this.address=data[0].address_1;
     this.city= data[0].city;
     this.state=data[0].state;
     this.country=data[0].country;
     this.pincode=data[0].pincode;
     this.invNo='BSINV'+data[0].invoice_id;
     this.frontInvoiceData.forEach(element => {
      element.pic_byte='data:image/jpeg;base64,' + element.pic_byte;
    });
      console.table(this.frontInvoiceData);
      });
  }
  data!:any;
  printRecipt()
  {

     this.data= document.getElementById('recipt');
    html2canvas(this.data).then(canvas => {

        var imgWidth = 208;
        var pageHeight = 295;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;

        const contentDataURL = canvas.toDataURL('image/png')
        let pdf = new jspdf('p', 'mm', 'a4');
        var position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
        pdf.save('new-file.pdf');
    });

  }

}
