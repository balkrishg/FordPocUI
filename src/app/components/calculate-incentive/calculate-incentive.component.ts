import { Component, OnInit } from '@angular/core';
import { DropdownValue } from '../../models/product-rule';
import {CalcIncentive, IncentiveList, Incentive} from '../../models/calc-incentive'
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
  sspIncentiveList : Incentive[];
ospIncentiveList : Incentive[];

enableReportBtn :Boolean = true;

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
          obj.label =  x.programCode + '-' + x.programName;
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

    this.productService.getCalculativeIncentiveReportList(this.calcIncentive).subscribe((response)=>{
      this.sspIncentiveList = response.SSP;
       this.ospIncentiveList = response.OSP;
      //  this.calculatedIncentiveList = response;

    })
// let response = {

//   "SSP": [

//       {

//           "id": 2,

//           "dealerCode": "12000",

//           "dealerName": "Lam Lukka",

//           "programCode": "PC001",

//           "subProductType": "SSP",

//           "noOfClaimsAllowed2": 5,

//           "noOfClaimsAllowed3": 8,

//           "noOfClaimsAllowed4": 6,

//           "noOfClaimsAllowed7": null,

//           "targetAchieved": 19,

//           "target": 12,

//           "achievedPercentage": 158,

//           "incentiveCategory": 100,

//           "total": 4500,

//           "dealerTargetMonth": "OCT19"

//       }

//   ],

//   "OSP": [

//       {

//           "id": 1,

//           "dealerCode": "12000",

//           "dealerName": "Lam Lukka",

//           "programCode": "PC001",

//           "subProductType": "OSP",

//           "noOfClaimsAllowed2": 24,

//           "noOfClaimsAllowed3": 14,

//           "noOfClaimsAllowed4": null,

//           "noOfClaimsAllowed7": null,

//           "targetAchieved": 38,

//           "target": 40,

//           "achievedPercentage": 95,

//           "incentiveCategory": 0,

//           "total": 3550,

//           "dealerTargetMonth": "OCT19"

//       },

//       {

//           "id": 3,

//           "dealerCode": "12200",

//           "dealerName": "Rattanathibet",

//           "programCode": "PC001",

//           "subProductType": "OSP",

//           "noOfClaimsAllowed2": 29,

//           "noOfClaimsAllowed3": 1,

//           "noOfClaimsAllowed4": null,

//           "noOfClaimsAllowed7": null,

//           "targetAchieved": 30,

//           "target": 28,

//           "achievedPercentage": 107,

//           "incentiveCategory": 100,

//           "total": 4550,

//           "dealerTargetMonth": "OCT19"

//       }

//   ]

// }​

// this.sspIncentiveList = response.SSP;
// this.ospIncentiveList = response.OSP;

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
    let ospList = new Array<IncentiveList>();
  
    this.ospIncentiveList.forEach(x=>{
      let osp = new IncentiveList();
      osp.dealerName = x.dealerName;
      osp.dealerCode = x.dealerCode;
      osp.programCode = x.programCode;
      osp.subProductType = x.subProductType;
      osp.noOfClaimsAllowed2 = x.noOfClaimsAllowed2;
      osp.noOfClaimsAllowed3 = x.noOfClaimsAllowed3;
      osp.noOfClaimsAllowed4 = x.noOfClaimsAllowed4;
      osp.noOfClaimsAllowed7 = x.noOfClaimsAllowed7;
      osp.targetAchieved = x.targetAchieved;
      osp.target = x.target;
      osp.achievedPercentage = x.achievedPercentage;
      osp.incentiveCategory = x.incentiveCategory;
      osp.total = x.total;
      osp.dealerTargetMonth = x.dealerTargetMonth;
      ospList.push(osp);
    })

    this.excelService.exportAsExcelFile(ospList, 'osp');
  }

  
  exportAsSSP():void {

    let sspList = new Array<IncentiveList>();
  
    this.ospIncentiveList.forEach(x=>{
      let ssp = new IncentiveList();
      ssp.dealerName = x.dealerName;
      ssp.dealerCode = x.dealerCode;
      ssp.programCode = x.programCode;
      ssp.subProductType = x.subProductType;
      ssp.noOfClaimsAllowed2 = x.noOfClaimsAllowed2;
      ssp.noOfClaimsAllowed3 = x.noOfClaimsAllowed3;
      ssp.noOfClaimsAllowed4 = x.noOfClaimsAllowed4;
      ssp.noOfClaimsAllowed7 = x.noOfClaimsAllowed7;
      ssp.targetAchieved = x.targetAchieved;
      ssp.target = x.target;
      ssp.achievedPercentage = x.achievedPercentage;
      ssp.incentiveCategory = x.incentiveCategory;
      ssp.total = x.total;
      ssp.dealerTargetMonth = x.dealerTargetMonth;
      sspList.push(ssp);
    })

    this.excelService.exportAsExcelFile(sspList, 'ssp');
  }

  exportAsAll():void {
    this.excelService.exportAsExcelFile(this.calculatedIncentiveList, 'osp&ssp');
  }

  enableButton(event){
    if(this.selectedProgramCode && this.selectedDealerCode){
      this.enableReportBtn = false;
    }else{
      this.enableReportBtn = true;
    }
  }
}
