import { Component, OnInit } from '@angular/core';
import { DropdownValue } from '../../models/product-rule';
import { CalcIncentive, IncentiveList, Incentive } from '../../models/calc-incentive'
import { ProductService } from '../../services/product.service';
import { ExcelService } from '../../services/excel.service';
import { MessageService } from 'primeng/api'
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
  programCodeList: any[];
  selectedProgramCode: string;
  calcIncentive: CalcIncentive;

  dealerList: any[];
  selectedDealerCode: DropdownValue[];
  calculatedIncentiveList: any[];
  sspIncentiveList: Incentive[];
  ospIncentiveList: Incentive[];

  enableReportBtn: Boolean = true;

  prdToDate: Date;
  prdFromDate: Date;
  fromMonth: any={};
  toMonth: any={};
  fromDate: any = {};
  toDate: any = {};
  minDate: Date;
  payoutFrequency: string;
  month: any = [];
  fromYearList: any = [];
  toYearList: any = [];
  quarterly:any=[];
  fromQuarterly:any={};
  toQuarterly:any={}
  fromYear: string;
  toYear: string;




  constructor(public productService: ProductService, private excelService: ExcelService,private messageService:MessageService) { }

  ngOnInit(): void {
    console.log(this.payoutFrequency);
    this.month = [{ name: "Select Month", code: null,id:'' },{ name: "January", code: "JAN",id:1 }, { name: "February", code: "FEB" ,id:2}, { name: "March", code: "MAR",id:3 }, { name: "April", code: "APR",id:4 }, { name: "May", code: "MAY",id:5 } ,{ name: "June", code: "JUN",id:6},{ name: "July", code: "JUL" ,id:7},{ name: "August", code: "AUG",id:8 },{ name: "September", code: "SEP",id:9 },{ name: "October", code: "OCT",id:10 },{ name: "November", code: "NOV",id:11 },{ name: "December", code: "DEC",id:12}];
    this.fromYearList = [{ label: "Select Year", value: null },{ label: "2015", value: "2015" }, { label: "2016", value: "2016" }, { label: "2017", value: "2017" }, { label: "2018", value: "2018" }, { label: "2019", value: "2019" }, { label: "2020", value: "2020" }];
    this.toYearList = [{ label: "Select Year", value: null ,disabled:false},{ label: "2015", value: "2015",disabled:false }, { label: "2016", value: "2016" ,disabled:false}, { label: "2017", value: "2017" ,disabled:false}, { label: "2018", value: "2018",disabled:false }, { label: "2019", value: "2019" ,disabled:false}, { label: "2020", value: "2020",disabled:false }];
    this.quarterly=[{name:"Select",code:null,id:''},{name:"Q1",code:"Q1",id:3},{name:"Q2",code:"Q2",id:6},{name:"Q3",code:"Q3",id:9},{name:"Q4",code:"Q4",id:12}]
    // To get Dealer Code list on Load
    this.productService.getAllDealerList().subscribe((response) => {
      if (response && response.length) {
        // this.dealerList = response;
        if (!this.dealerList) {
          this.dealerList = [];
        }

        response.forEach(x => {
          let obj = {
            label: '',
            value: ''
          };
          obj.label = x.value + '-' + x.label;
          obj.value = x.value;

          this.dealerList.push(obj);
        });
      }
    });

    // To get Program Code list on Load
    this.productService.getAllIncentiveProgram().subscribe((response) => {
      if (!this.programCodeList) {
        this.programCodeList = [];
      }
      const codeList = [];
      if (response && response.length) {
        //  this.programCodeList = response;
       this.programCodeList=[{label:"Select",value:null}];
        response.forEach(x => {
          const obj = {
            label: '',
            value: ''
          };
          obj.label = x.programCode + '-' + x.programName;
          obj.value = x.programCode;

          this.programCodeList.push(obj);
        });

      }

    });

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


    // let procode = [

    //   {

    //       "programCode": "PC001",

    //       "programName": "Cash Incentive1",

    //       "dateFrom": "01-09-2019",

    //       "dateTo": "30-11-2019",

    //       "status": null,

    //       "statusMsg": null

    //   },

    //   {

    //       "programCode": "PC002",

    //       "programName": "Cash INc TEST",

    //       "dateFrom": "01-03-2020",

    //       "dateTo": "31-03-2020",

    //       "status": null,

    //       "statusMsg": null

    //   }

    // ]​


    // if(!this.programCodeList){
    //   this.programCodeList = [];
    // }
    // procode.forEach(x=>{
    //         let obj = {
    //           label:'',
    //           value: ''
    //         };
    //         obj.label =  x.programCode + '-' + x.programName;
    //         obj.value = x.programCode;

    //         this.programCodeList.push(obj);
    //       });



  }





  calculateIncentive() {

    if (!this.calcIncentive) {
      this.calcIncentive = new CalcIncentive();
    }
    this.calcIncentive.dealerCodes = this.selectedDealerCode;
    this.calcIncentive.programCode = this.selectedProgramCode;
    let fromDate = '';
    let toDate = '' ;
    if(this.payoutFrequency==='Monthly'){
      var lastDayOfFRomMonth = new Date(parseInt(this.fromYear), parseInt(this.fromMonth.id)-1 , 1).getTime();
      console.log(lastDayOfFRomMonth);
      var lastDayOfToMonth = new Date(parseInt(this.toYear), parseInt(this.toMonth.id)-1 , 1).getTime();
      console.log(lastDayOfToMonth);
      if(lastDayOfToMonth>lastDayOfFRomMonth){
        console.log(1);
        fromDate=this.fromMonth.code;
        toDate=this.toMonth.code;
      }else{
        this.showError('From Date should be less than To Date');
        return 
      }
    }
    if(this.payoutFrequency==='Quarterly'){
      var lastDayOfFRomMonth = new Date(parseInt(this.fromYear), parseInt(this.fromQuarterly.id)-1 , 1).getTime();
      console.log(lastDayOfFRomMonth);
      var lastDayOfToMonth = new Date(parseInt(this.toYear), parseInt(this.toQuarterly.id)-1 , 1).getTime();
      console.log(lastDayOfToMonth);
      if(lastDayOfToMonth>lastDayOfFRomMonth){
        fromDate=this.fromQuarterly.code;
        toDate=this.toQuarterly.code;
        console.log(1);
      }else{
        this.showError('From Date should be less than To Date');
        return 
      }
    }
    //this.calcIncentive.payoutFrequency=this.payoutFrequency;
    
    // const dateFrom = (this.fromDate.length > 1 ? this.fromDate : ('0' + this.fromDate)) + '-' + (this.fromMonth.length > 1 ? this.fromMonth : ('0' + this.fromMonth)) + '-' + this.prdFromDate.getFullYear();
    // const dateTo = (this.toDate.length > 1 ? this.toDate : ('0' + this.toDate)) + '-' + (this.toMonth.length > 1 ? this.toMonth : ('0' + this.toMonth)) + '-' + this.prdToDate.getFullYear();
    this.calcIncentive.incentiveFrom = fromDate;
    this.calcIncentive.incentiveTo= toDate;
    this.calcIncentive.incentiveFromYear = this.fromYear;
    this.calcIncentive.incentiveToYear= this.toYear;
    this.productService.getCalculativeIncentiveReportList(this.calcIncentive).subscribe((response) => {
      this.sspIncentiveList = response.report.SSP;
      this.ospIncentiveList = response.report.OSP;
      this.calculatedIncentiveList = response.report.Total;
      if(response.report.errorMessage!=undefined && response.report.errorMessage!=null){
        this.showError(response.report.errorMessage);
      }

    });
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
  exportAsOSP(): void {
    let ospList = new Array<IncentiveList>();

    this.ospIncentiveList.forEach(x => {
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


  exportAsSSP(): void {

    let sspList = new Array<IncentiveList>();

    this.sspIncentiveList.forEach(x => {
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

  exportAsAll(): void {
    let totalList = new Array<IncentiveList>();

    this.calculatedIncentiveList.forEach(x => {
      let total = new IncentiveList();
      total.dealerName = x.dealerName;
      total.dealerCode = x.dealerCode;
      total.programCode = x.programCode;
      total.noOfClaimsAllowed2 = x.noOfClaimsAllowed2;
      total.noOfClaimsAllowed3 = x.noOfClaimsAllowed3;
      total.noOfClaimsAllowed4 = x.noOfClaimsAllowed4;
      total.noOfClaimsAllowed7 = x.noOfClaimsAllowed7;
      total.targetAchieved = x.targetAchieved;
      total.target = x.target;
      total.achievedPercentage = x.achievedPercentage;
      total.incentiveCategory = x.incentiveCategory;
      total.total = x.total;
      total.dealerTargetMonth = x.dealerTargetMonth;
      totalList.push(total);
    })

    this.excelService.exportAsExcelFile(totalList, 'totalincentive');
  }

  enableButton(event) {
   
    if (this.selectedProgramCode && this.selectedDealerCode) {
      this.enableReportBtn = false;
    } else {
      this.enableReportBtn = true;
    }
  }
  programCodeChange(event) {
    console.log(event);
    this.payoutFrequency=null;
    this.fromMonth={ name: "Select Month", code: null };
    this.toQuarterly={name:"Select",code:null};
    this.fromQuarterly={name:"Select",code:null};
    this.fromYear=null;
    this.toMonth={ name: "Select Month", code: null };
    this.toYear=null;
    if(event.value!==null){
    this.productService.getIncentiveProgram(event.value).subscribe((response) => {
    console.log(response);
    this.payoutFrequency=response.payoutFrequency;
    this.payoutFrequency="Monthly";
    //this.payoutFrequency="Quarterly";
    this.enableButton(event);

    });
  }
  }
  dealerCodeChange(event){
    this.selectedProgramCode=null;
    this.payoutFrequency=null;
   this.fromMonth={ name: "Select Month", code: null };
   this.fromYear=null;
   this.toMonth={ name: "Select Month", code: null };
   this.toYear=null;
  }
  showError(msg) {
    this.messageService.add({ severity: 'error', summary: 'Error !', detail: msg });
  }
  fromYearChange(event){
    const fromYear=event.value;
    if(fromYear !=undefined && fromYear !=null){
      this.toYearList.forEach(x => {
        if(x.value >= fromYear ){
x.disabled=false;
        }else{
          x.disabled=true;
        }
        
      });

    }
  }
  enableReport():boolean{
if(this.selectedProgramCode && this.selectedDealerCode && (this.fromMonth || this.fromQuarterly) && this.fromYear && (this.toMonth || this.toQuarterly) ){
return true;  
}else{
  return false;
}
  }
}
