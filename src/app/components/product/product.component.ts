import { Component, OnInit } from '@angular/core'; 
//import { Product } from '../models/product';
import { Product } from '../../models/product';
import {ProductService} from '../../services/product.service';
import { MessageService } from 'primeng/api'
import { stringify } from 'querystring';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {


product :Product;

fromMonth: string ;
toMonth: string ;
fromDate : string;
toDate: string;
prdToDate :Date;
prdFromDate : Date;
minDate : Date;

  constructor(public productService : ProductService, private messageService : MessageService) 
  {  
    if(!this.product) {
      this.product = new Product();
    }
    
  }

  ngOnInit(): void {
    


  }

   saveIncentive(){
    this.fromMonth = (this.prdFromDate.getMonth()+1).toString();
    this.toMonth = (this.prdToDate.getMonth()+1).toString();

    this.fromDate = this.prdFromDate.getDate().toString();
    this.toDate = this.prdToDate.getDate().toString();

    let dateFrom = (this.fromDate.length>1? this.fromDate : ('0'+this.fromDate)) + '-' + (this.fromMonth.length>1? this.fromMonth : ('0'+this.fromMonth)) + '-'+this.prdFromDate.getFullYear();
    let dateTo = (this.toDate.length>1? this.toDate : ('0'+this.toDate)) + '-'+(this.toMonth.length >1? this.toMonth : ('0'+this.toMonth)) + '-' +this.prdToDate.getFullYear();
    
    this.product.dateFrom = dateFrom;
    this.product.dateTo = dateTo;

    this.productService.saveIncentiveProgram(this.product).subscribe((response)=>{
      if(response.status === "Success"){
        //console.log(response,"ha");
        this.showSuccess();
      }
     
    })
    console.log(this.product);
 
   }
   
   showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success !', detail:'Incentive program saved successful.'});
  }

}
