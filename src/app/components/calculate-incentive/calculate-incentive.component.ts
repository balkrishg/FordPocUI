import { Component, OnInit } from '@angular/core';
import { DropdownValue,CalcIncentive } from '../../models/product-rule';
import { ProductService } from '../../services/product.service';
import {ExcelService} from '../../services/excel.service';

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
  programCodeList : any[];
  selectedProgramCode : DropdownValue[];
  calcIncentive : CalcIncentive;

  dealerList : any [];
  selectedDealerCode: DropdownValue[];
  calculatedIncentiveList : any[];

  constructor(public productService: ProductService, 
    private excelService:ExcelService) { }

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

       // To get Program Code list on Load
    this.productService.getAllIncentiveProgram().subscribe((response)=>{
      if(!this.programCodeList){
        this.programCodeList = [];
      }
    let codeList =[];
      if(response && response.length){
      //  this.programCodeList = response;

        response.forEach(x=>{
          let obj = {
            label:'',
            value: ''
          };
          obj.label =  x.programName;
          obj.value = x.programCode;
      
          this.programCodeList.push(obj);
        });

      }

    })

//   let dealerName =  [

//         {
    
//             "label": "Lam Lukka",
    
//             "value": "12000"
    
//         },
    
//         {
    
//             "label": "Rattanathibet",
    
//             "value": "12200"
    
//         },
    
//         {
    
//             "label": "Ratchapruek",
    
//             "value": "14600"
    
//         },
    
//         {
    
//             "label": "NARA - Suwintawong",
    
//             "value": "15300"
    
//         },
    
//         {
    
//             "label": "Laksi-Ramintra",
    
//             "value": "15900"
    
//         }​
    
    
//     ]
// if(dealerName.length){
  
//   if(!this.dealerList){
//     this.dealerList = [];
//   }
//   dealerName.forEach(x=>{
//     let obj = {
//       label:'',
//       value: ''
//     };
//     obj.label =  x.value + '-' + x.label;
//     obj.value = x.value;

//     this.dealerList.push(obj);
//   }) 
// } 
  
}
    


  

  calculateIncentive(){

    if(!this.calcIncentive){
      this.calcIncentive = new CalcIncentive();
    }
  this.calcIncentive.dealerCodes = this.selectedDealerCode;
  this.calcIncentive.programCodes = this.selectedProgramCode;

    this.productService.getCalculativeIncentiveList(this.calcIncentive).subscribe((response)=>{
        this.calculatedIncentiveList = response;

    })

    // this.calculatedIncentiveList = [

    //   {
    
    //       "id": 7,
    
    //       "dealerCode": "41700",
    
    //       "dealerName": "Sakolnakorn",
    
    //       "productType": "Schedule Service",
    
    //       "subProductType": "SSP",
    
    //       "noOfClaimsAllowed2": "1",
    
    //       "noOfClaimsAllowed3": null,
    
    //       "noOfClaimsAllowed4": "2",
    
    //       "noOfClaimsAllowed7": null,
    
    //       "targetAchieved": "3",
    
    //       "target": "3",
    
    //       "achievedPercentage": "100.0",
    
    //       "incentiveCategory": "100%",
    
    //       "total": "900"
    
    //   },
    
    //   {
    
    //       "id": 8,
    
    //       "dealerCode": "41700",
    
    //       "dealerName": "Sakolnakorn",
    
    //       "productType": "Schedule Service",
    
    //       "subProductType": "OSP",
    
    //       "noOfClaimsAllowed2": "32",
    
    //       "noOfClaimsAllowed3": null,
    
    //       "noOfClaimsAllowed4": null,
    
    //       "noOfClaimsAllowed7": null,
    
    //       "targetAchieved": "32",
    
    //       "target": "28",
    
    //       "achievedPercentage": "114.0",
    
    //       "incentiveCategory": "100%",
    
    //       "total": "4800"
    
    //   },
    
    //   {
    
    //       "id": 9,
    
    //       "dealerCode": "14200",
    
    //       "dealerName": "Petchkasem",
    
    //       "productType": "Schedule Service",
    
    //       "subProductType": "SSP",
    
    //       "noOfClaimsAllowed2": null,
    
    //       "noOfClaimsAllowed3": null,
    
    //       "noOfClaimsAllowed4": "4",
    
    //       "noOfClaimsAllowed7": "1",
    
    //       "targetAchieved": "5",
    
    //       "target": "15",
    
    //       "achievedPercentage": "33.0",
    
    //       "incentiveCategory": "0%",
    
    //       "total": "1200"
    
    //   },
    
    //   {
    
    //       "id": 10,
    
    //       "dealerCode": "14200",
    
    //       "dealerName": "Petchkasem",
    
    //       "productType": "Schedule Service",
    
    //       "subProductType": "OSP",
    
    //       "noOfClaimsAllowed2": "50",
    
    //       "noOfClaimsAllowed3": "3",
    
    //       "noOfClaimsAllowed4": null,
    
    //       "noOfClaimsAllowed7": null,
    
    //       "targetAchieved": null,
    
    //       "target": "0",
    
    //       "achievedPercentage": "0.0",
    
    //       "incentiveCategory": "0%",
    
    //       "total": "8100"
    
    //   },
    
    //   {
    
    //       "id": 11,
    
    //       "dealerCode": "13200",
    
    //       "dealerName": "Sukhumvit 62",
    
    //       "productType": "Schedule Service",
    
    //       "subProductType": "SSP",
    
    //       "noOfClaimsAllowed2": "2",
    
    //       "noOfClaimsAllowed3": "2",
    
    //       "noOfClaimsAllowed4": null,
    
    //       "noOfClaimsAllowed7": "1",
    
    //       "targetAchieved": "5",
    
    //       "target": "7",
    
    //       "achievedPercentage": "71.0",
    
    //       "incentiveCategory": "0%",
    
    //       "total": "700"
    
    //   },
    
    //   {
    
    //       "id": 12,
    
    //       "dealerCode": "13200",
    
    //       "dealerName": "Sukhumvit 62",
    
    //       "productType": "Schedule Service",
    
    //       "subProductType": "OSP",
    
    //       "noOfClaimsAllowed2": "19",
    
    //       "noOfClaimsAllowed3": "3",
    
    //       "noOfClaimsAllowed4": null,
    
    //       "noOfClaimsAllowed7": null,
    
    //       "targetAchieved": "22",
    
    
    //       "target": "140",
    
    //       "achievedPercentage": "16.0",
    
    //       "incentiveCategory": "0%",
    
    //       "total": "1800"
    
    //   }
    
    // ]​
  }
  exportAsOSP():void {
    this.excelService.exportAsExcelFile(this.calculatedIncentiveList, 'osp');
  }

  
  exportAsSSP():void {
    this.excelService.exportAsExcelFile(this.calculatedIncentiveList, 'ssp');
  }

  exportAsAll():void {
    this.excelService.exportAsExcelFile(this.calculatedIncentiveList, 'osp&ssp');
  }

}
