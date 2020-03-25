import { Component, OnInit } from '@angular/core';
import { DropdownValue } from '../../models/product-rule';
import { ProductService } from '../../services/product.service'

@Component({
  selector: 'app-calculate-incentive',
  templateUrl: './calculate-incentive.component.html',
  styleUrls: ['./calculate-incentive.component.scss']
})
export class CalculateIncentiveComponent implements OnInit {

  // selectedProductType: DropdownValue;
  // selectedNofContracts: DropdownValue;

  // productType: any[];
  // noOfContracts: any[];
  dealerList : any [];
  selectedDealerCode: DropdownValue[];
  calculatedIncentiveList : any[];

  constructor(public productService: ProductService) { }

  ngOnInit(): void {

   // To get Dealer Code list on Load
      this.productService.getAllDealerList().subscribe((response)=>{
        if(response && response.length){
         // this.dealerList = response;
      if(!this.dealerList){
        this.dealerList = [];
      }

         response.forEach(x=>{
             let obj = {
               label:'',
               value: ''
             };
             obj.label =  x.value + '-' + x.label;
             obj.value = x.value;
        
             this.dealerList.push(obj);
           })
        }
      })

  
  
}
    


  

  calculateIncentive(){

 let dealerCodeList = this.selectedDealerCode;

 
    this.productService.getCalculativeIncentiveList(dealerCodeList).subscribe((response)=>{
        this.calculatedIncentiveList = response;

    })
  }

  


}
