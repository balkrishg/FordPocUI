import { Component, OnInit } from '@angular/core';
import { ProductRule , DropdownValue} from '../../models/product-rule';
import { ProductService } from '../../services/product.service';
import { Status } from '../../models/product';

@Component({
  selector: 'app-product-rule',
  templateUrl: './product-rule.component.html',
  styleUrls: ['./product-rule.component.scss']
})
export class ProductRuleComponent implements OnInit {

  display: boolean = false;

  programCodeList : any[];
  selectedProgramCode : DropdownValue;
  
  selectedProductType : DropdownValue;
  selectedSubProductType: DropdownValue;
  selectedproductSaleType: DropdownValue;
  selectedsaleService : DropdownValue;
  selectedRecepient : DropdownValue;
  selectedPerformanceTarget: DropdownValue;

  productType : any[];
  subproductType: any[];
  productSaleType : any[];
  saleService : any[];
  recepient: any[];
  performanceTarget: any[];

  productRule : ProductRule;

  savedIncentiveList : ProductRule[];

  constructor(public productService: ProductService) { 
    if(!this.productRule) {
      this.productRule = new ProductRule();
    }
  }

  ngOnInit(): void {

    // To get Program Code list on Load
    // this.productService.getAllIncentiveProgram().subscribe((response)=>{
    //   if(response && response.length){
    //     this.programCodeList = response;
    //   }
    // })

   let response = [

      {
  
          "programCode": "PC002",
  
          "programName": "Cash Incentive",
  
          "dateFrom": "01-10-2019",
  
          "dateTo": "31-10-2019"
  
      },
  
      {
  
          "programCode": "PC001",
  
          "programName": "Cash Incentive",
  
          "dateFrom": "01-10-2019",
  
          "dateTo": "31-10-2019"
  
      }
  
  ]​

  if(!this.programCodeList){
    this.programCodeList = [];
  }
let codeList =[];
  if(response && response.length){
    response.forEach(x=>{
      let obj = {
        name:'',
        code: ''
      };
      obj.name =  x.programName;
      obj.code = x.programCode;
  
      this.programCodeList.push(obj);
    })
  }
 console.log(this.programCodeList,"kjhkjhk");

// other dropdown

    this.productType = [{
      name: 'Scheduled Service', code: 'scheduledService'
    }],
    this.productSaleType = [{
      name: 'Retail', code: 'retail'
    }],
    this.saleService = [{
      name: 'All', code: 'all'
    }],
    this.recepient = [{
      name: 'Sales Consultant', code: 'salesConsultant'
    }],
    this.subproductType =[{
      name: 'SSP', code: 'ssp'
    },
  {
    name:'OSP',
    code:'osp'
  }],
  this.performanceTarget =[{
    name: 'lesser than 100%', code: 'lt'
  },
{
  name: 'greater than 100%', code: 'gt'
}]
  }

 

  showDialog() {
      this.display = true;
  }

  onChange(event){
    
  }

  SaveIncentiveStructure(){
    this.display=false;
    this.productRule.programCode = this.selectedProgramCode.code;
    this.productRule.productType = this.selectedProductType.code;
    this.productRule.subProductType = this.selectedSubProductType.code;
    this.productRule.productSaleType = this.selectedproductSaleType.code;
    this.productRule.contractType = this.selectedsaleService.code;
    this.productRule.recipient = this.selectedRecepient.code;
    this.productRule.performanceTarget = this.selectedPerformanceTarget.code;
    console.log(this.productRule,"productRule");

    // this.productService.saveIncentiveStructure(this.productRule).subscribe((response)=>{
    //     //fill the table value;
    //     // this.savedIncentiveList = response;
    // })
    
    
  }

  getProgramDetailsByCode(event){
debugger;

//     let programCode = event.target.value;
//   let programIncentive = new Status();
//   debugger;
//   this.productRule.productType = "scheduledService";
  
//  if(!this.selectedProductType){
//         this.selectedProductType = new DropdownValue();
//         this.selectedProductType.code ="scheduledService";
//         this.selectedProductType.name ="Scheduled Service";
//       }

//       this.ProductTypeChange();

    // this.productService.getProgramDetailsByCode(programCode).subscribe((response)=>{
    //   if(response.status === "Success"){
     // programIncentive = response;
      //     if(programIncentive.scheduleService === "true"){
      //       this.productRule.programCode = programIncentive.programCode;
      //       this.productRule.programName = programIncentive.programName;
      //       this.productRule.productType = "scheduledService"
      // if(!this.selectedProductType){
      //   this.selectedProductType = new DropdownValue();
      //   this.selectedProductType.code ="scheduledService";
      //   this.selectedProductType.name ="Scheduled Service";
      // }
      //     }
    //}
    // })
  }

  getAllIncentiveStructureByProgramCode(programCode){

//  this.productService.getAllIncentiveStructureByProgramCode(programCode).subscribe((response)=>{
  // if(response && response.incentiveStructureBOList && response.incentiveStructureBOList.length){
//   this.savedIncentiveList = response.incentiveStructureBOList;
 // }
//     })
let response = {

  "programCode": "PC002",

  "programName": "Cash Incentive",

  "dateFrom": "01-10-2019",

  "dateTo": "31-10-2019",

  "incentiveStructureBOList": [

      {

          "incStructureId": "1",

          "programCode": "PC002",

          "programName": "Cash Incentive",

          "dateFrom": "16-10-2020",

          "dateTo": "25-10-2020",

          "productType": "Schedule Service",

          "subProductType": "SSP",

          "productSaleType": "Retail",

          "contractType": "ALL",

          "recipient": "Sales Consultant",

          "noOfServices": "2",

          "performanceTarget": "LT",

          "incentives": "100",

          "status": null,

          "statusMsg": null

      },

      {

          "incStructureId": "2",

          "programCode": "PC002",

          "programName": "Cash Incentive",

          "dateFrom": "16-10-2020",

          "dateTo": "25-10-2020",

          "productType": "Schedule Service",

          "subProductType": "SSP",

          "productSaleType": "Retail",

          "contractType": "ALL",

          "recipient": "Sales Consultant",

          "noOfServices": "2",

          "performanceTarget": "LT",

          "incentives": "100",

          "status": null,

          "statusMsg": null

      }

  ]

}​
this.productRule.programName = response.programName;
this.productRule.dateFrom = response.dateFrom;
this.productRule.dateTo = response.dateTo;

this.savedIncentiveList = response.incentiveStructureBOList;

  }


  ProgramCodeChange(event){
debugger;
   
     // this.productRule.productType = event.value.code;
   

    this.getAllIncentiveStructureByProgramCode(this.selectedProgramCode.code);
  }
  
}
