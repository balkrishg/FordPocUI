import { Component, OnInit } from '@angular/core';
import { ProductRule , DropdownValue} from '../../models/product-rule';
import { ProductService } from '../../services/product.service';
import { Status } from '../../models/product';


import { MessageService } from 'primeng/api'

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
  selectedNofContracts: DropdownValue;
  

  productType : any[];
  subproductType: any[];
  productSaleType : any[];
  saleService : any[];
  recepient: any[];
  performanceTarget: any[];
  noOfContracts: any[]

  productRule : ProductRule;

  savedIncentiveList : ProductRule[];

  isPrgExists: boolean = false;

  constructor(public productService: ProductService, private messageService : MessageService) { 
    if(!this.productRule) {
      this.productRule = new ProductRule();
    }
  }

  ngOnInit(): void {

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
            name:'',
            code: ''
          };
          obj.name =  x.programName;
          obj.code = x.programCode;
      
          this.programCodeList.push(obj);
        });
        this.isPrgExists  = true;

      }
    })



 
 console.log(this.programCodeList,"kjhkjhk");

// other dropdown

    this.productType = [{
      name: 'Schedule Service', code: 'scheduledService'
    },
  { name: 'Extended Warranty', code: 'extendedwarranty'}],
    this.productSaleType = [{
      name: 'Retail', code: 'RETAIL'
    }],
    this.saleService = [{
      name: 'All', code: 'ALL'
    },
  { name: 'Sales', code: 'SALES'},{ name: 'Service', code: 'SERVICE'}],
    this.recepient = [{
      name: 'Sales Consultant', code: 'SalesConsultant'
    }],
    this.subproductType =[{
      name: 'SSP', code: 'SSP'
    },
  {
    name:'OSP',
    code:'OSP'
  }],
  this.performanceTarget =[{
    name: '<100%', code: 'LT'
  },
{
  name: '>=100%', code: 'GT'
}]
  }

 

  showDialog() {
    this.clearIncentiveStructure();
      this.display = true;
  }

  onChange(event){
    
  }

  SaveIncentiveStructure(){
    this.display=false;
    this.productRule.programCode = this.selectedProgramCode.code;
    this.productRule.productType = this.selectedProductType.name;
    this.productRule.subProductType = this.selectedSubProductType.code;
    this.productRule.productSaleType = this.selectedproductSaleType.code;
    this.productRule.contractType = this.selectedsaleService.code;
    this.productRule.recipient = this.selectedRecepient.name;
    this.productRule.performanceTarget = this.selectedPerformanceTarget.code;
    this.productRule.noOfServices = this.selectedNofContracts.code;
    this.productRule.incStructureId = null;
    console.log(this.productRule,"productRule");




    this.productService.saveIncentiveStructure(this.productRule).subscribe((response)=>{
        //fill the table value;
        if(response.status === "Success"){
          this.clearIncentiveStructure();
          this.showSuccess();
          this.savedIncentiveList.push(response);
        }
     
      console.log(this.savedIncentiveList,"jhhjjhjh")
    })
    
    
  }


 

  getAllIncentiveStructureByProgramCode(programCode){

 this.productService.getAllIncentiveStructureByProgramCode(programCode).subscribe((response)=>{
  if(response){
   
    this.productRule.programName = response.programName;
    this.productRule.dateFrom = response.dateFrom;
    this.productRule.dateTo = response.dateTo;
    if(response.incentiveStructureBOList && response.incentiveStructureBOList.length){
      this.savedIncentiveList = response.incentiveStructureBOList;
  } 
 }
    })

  }
  SubProductChange(event){
    let selectedProductType = event.value;
    if(selectedProductType.name === 'SSP'){
      //do SSP code
 
      this.noOfContracts = [
        {name:'2' ,code:'2'},
        {name:'3' ,code:'3'},
        {name:'4' ,code:'4'},
        {name:'7' ,code:'7'}
      ]
    }
    else{
      //do osp code
 
      this.noOfContracts = [
       {name:'2' ,code:'2'},
       {name:'3' ,code:'3'},
    
     ]
    }
  }

  ProgramCodeChange(event){
this.savedIncentiveList = [];
//this.productRule = null;
//this.selectedProgramCode = new DropdownValue();

this.clearIncentiveStructure();
    this.getAllIncentiveStructureByProgramCode(this.selectedProgramCode.code);
  }
  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success !', detail:'Incentive program struture added successful.'});
  }

  cancelIncentiveStructure(){
   this.clearIncentiveStructure();
    this.display = false;
    
  }

  clearIncentiveStructure(){
    this.selectedProductType  = new DropdownValue();
 this.selectedSubProductType = new DropdownValue();
this.selectedproductSaleType = new DropdownValue();
this.selectedsaleService = new DropdownValue();
this.selectedRecepient = new DropdownValue();
this.selectedPerformanceTarget= new DropdownValue();
this.selectedNofContracts = new DropdownValue();
this.productRule.incentives = null;
  }

 
}
