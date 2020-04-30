import { Component, OnInit } from '@angular/core';
import { DropdownValue } from '../../models/product-rule';
import { CalcIncentive, IncentiveList, Incentive } from '../../models/calc-incentive'
import { ProductService } from '../../services/product.service';
import { ExcelService } from '../../services/excel.service';
import { MessageService } from 'primeng/api'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-calculate-incentive',
  templateUrl: './calculate-incentive.component.html',
  styleUrls: ['./calculate-incentive.component.scss']
})
export class CalculateIncentiveComponent implements OnInit {

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
  incentiveCalculationForm: FormGroup;
info: any[];
showInfo:boolean = false;


  constructor(private formBuilder: FormBuilder,public productService: ProductService, private excelService: ExcelService,private messageService:MessageService) { }

  ngOnInit(): void {

    this.incentiveCalculationForm = new FormGroup({
      selectedDealerCode: new FormControl([]),
      selectedProgramCode:new FormControl('',Validators.required),
      payoutFrequency:new FormControl('',Validators.required),
      fromYear: new FormControl('',Validators.required),
      toYear: new FormControl('',Validators.required),
      fromMonth: new FormControl('',Validators.required),
      toMonth: new FormControl('',Validators.required),
      fromQuarterly: new FormControl('',Validators.required),
      toQuarterly: new FormControl('',Validators.required),
     
  });
  this.incentiveCalculationForm.get("payoutFrequency").valueChanges.subscribe((value) => {
        if(value === 'Monthly') {
      this.payoutFrequency='Monthly';
      this.incentiveCalculationForm.get("fromMonth").enable();
    this.incentiveCalculationForm.get("toMonth").enable();
    this.incentiveCalculationForm.get("fromQuarterly").disable();
    this.incentiveCalculationForm.get("toQuarterly").disable();
    } else if (value === 'Quarterly') {
      this.payoutFrequency='Quarterly';
      this.incentiveCalculationForm.get("fromMonth").disable();
    this.incentiveCalculationForm.get("toMonth").disable();
    this.incentiveCalculationForm.get("fromQuarterly").enable();
    this.incentiveCalculationForm.get("toQuarterly").enable();
    }
});
    console.log(this.incentiveCalculationForm.get('payoutFrequency').value);
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


  }

  calculateIncentive() {

    if (!this.calcIncentive) {
      this.calcIncentive = new CalcIncentive();
    }
    this.calcIncentive.dealerCodes = this.incentiveCalculationForm.controls['selectedDealerCode'].value; 
    this.calcIncentive.programCode = this.incentiveCalculationForm.controls['selectedProgramCode'].value;
    let fromDate = '';
    let toDate = '' ;
    this.fromYear=this.incentiveCalculationForm.controls['fromYear'].value; 
    this.toYear=this.incentiveCalculationForm.controls['toYear'].value;
    if(this.payoutFrequency==='Monthly'){
   
      this.fromMonth=this.incentiveCalculationForm.controls['fromMonth'].value; 
     
      this.toMonth=this.incentiveCalculationForm.controls['toMonth'].value; 
      console.log(new Date(parseInt(this.fromYear), parseInt(this.fromMonth.id)-1 , 1));
      console.log(new Date(parseInt(this.fromYear), parseInt(this.fromMonth.id) , 0));
      var firstDayOfFRomMonth = new Date(parseInt(this.fromYear), parseInt(this.fromMonth.id)-1 , 1).getTime();
      console.log(firstDayOfFRomMonth);
      var lastDayOfToMonth = new Date(parseInt(this.toYear), parseInt(this.toMonth.id) , 0).getTime();
      console.log(lastDayOfToMonth);
      if(lastDayOfToMonth>firstDayOfFRomMonth){
        console.log(1);
        fromDate=this.fromMonth.code;
        toDate=this.toMonth.code;
      }else{
        this.showError('From Date should be less than To Date');
        return 
      }
    }
    if(this.payoutFrequency==='Quarterly'){
     
      this.fromQuarterly=this.incentiveCalculationForm.controls['fromQuarterly'].value; 
      this.toQuarterly=this.incentiveCalculationForm.controls['toQuarterly'].value; 
      var lastDayOfFRomMonth = new Date(parseInt(this.fromYear), parseInt(this.fromQuarterly.id)-1 , 1).getTime();
      console.log(lastDayOfFRomMonth);
      var lastDayOfToMonth = new Date(parseInt(this.toYear), parseInt(this.toQuarterly.id) , 0).getTime();
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
      if(response.errorMessages != undefined && response.errorMessages != null){
        this.showInfo = true;
        this.info = response.errorMessages;
       // this.showWarning(response.errorMessages);
      }

    });
   
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
      osp.amountEarnedCA2 = x.amountEarnedCA2;
      osp.amountEarnedCA3 = x.amountEarnedCA3;
      osp.amountEarnedCA4 = x.amountEarnedCA4;
      osp.amountEarnedCA7 = x.amountEarnedCA7;
      osp.targetAchieved = x.targetAchieved;
      osp.target = x.target;
      osp.achievedPercentage = x.achievedPercentage;
      osp.incentiveCategory = x.incentiveCategory;
      osp.total = x.total;
      osp.dealerTargetMonth = x.dealerTargetPeriod;
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
      ssp.amountEarnedCA2 = x.amountEarnedCA2;
      ssp.amountEarnedCA3 = x.amountEarnedCA3;
      ssp.amountEarnedCA4 = x.amountEarnedCA4;
      ssp.amountEarnedCA7 = x.amountEarnedCA7;
      ssp.targetAchieved = x.targetAchieved;
      ssp.target = x.target;
      ssp.achievedPercentage = x.achievedPercentage;
      ssp.incentiveCategory = x.incentiveCategory;
      ssp.total = x.total;
      ssp.dealerTargetMonth = x.dealerTargetPeriod;
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
      total.amountEarnedCA2 = x.amountEarnedCA2;
      total.amountEarnedCA3 = x.amountEarnedCA3;
      total.amountEarnedCA4 = x.amountEarnedCA4;
      total.amountEarnedCA7 = x.amountEarnedCA7;
      total.targetAchieved = x.targetAchieved;
      total.target = x.target;
      total.achievedPercentage = x.achievedPercentage;
      total.incentiveCategory = x.incentiveCategory;
      total.total = x.total;
      total.dealerTargetMonth = x.dealerTargetPeriod;
      totalList.push(total);
    })

    this.excelService.exportAsExcelFile(totalList, 'totalincentive');
  }

  programCodeChange(event) {
    console.log(event);
    this.showInfo = false;
    this.info = null;
    this.incentiveCalculationForm.controls['payoutFrequency'].setValue(null);
    this.incentiveCalculationForm.controls['fromMonth'].setValue({ name: "Select Month", code: null });
    this.incentiveCalculationForm.controls['fromQuarterly'].setValue({name:"Select",code:null});
    this.incentiveCalculationForm.controls['toMonth'].setValue({ name: "Select Month", code: null });
    this.incentiveCalculationForm.controls['toQuarterly'].setValue({name:"Select",code:null});
    this.incentiveCalculationForm.controls['fromYear'].setValue(null);
    this.incentiveCalculationForm.controls['toYear'].setValue(null);
    
    if(event.value!==null){
    this.productService.getIncentiveProgram(event.value).subscribe((response) => {
    console.log(response);
    this.payoutFrequency=response.payoutFrequency;
    this.incentiveCalculationForm.controls['payoutFrequency'].setValue(this.payoutFrequency);
   // this.incentiveCalculationForm.controls['payoutFrequency'].setValue('Quarterly');
   // this.incentiveCalculationForm.controls['payoutFrequency'].setValue('Monthly');
   
    });
  }
  }
  dealerCodeChange(event){
 
    this.incentiveCalculationForm.controls['selectedProgramCode'].setValue(null);
    this.incentiveCalculationForm.controls['payoutFrequency'].setValue(null);
    this.incentiveCalculationForm.controls['fromMonth'].setValue({ name: "Select Month", code: null });
    this.incentiveCalculationForm.controls['fromQuarterly'].setValue({name:"Select",code:null});
    this.incentiveCalculationForm.controls['toMonth'].setValue({ name: "Select Month", code: null });
    this.incentiveCalculationForm.controls['toQuarterly'].setValue({name:"Select",code:null});
    this.incentiveCalculationForm.controls['fromYear'].setValue(null);
    this.incentiveCalculationForm.controls['toYear'].setValue(null);
  }
  showError(msg) {
    this.messageService.add({ severity: 'error', summary: 'Error !', detail: msg });
  }

  showWarning(msg) {
    this.messageService.add({ severity: 'info', summary: 'Info !', detail: msg });
  }
  fromYearChange(event){
    this.toYear=null;
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
  
}
