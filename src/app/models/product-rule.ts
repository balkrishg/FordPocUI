export class ProductRule {
    incStructureId: string;
    programCode : string;
    programName : string;
    productType : string;
    subProductType: string;
    productSaleType : string;
    contractType: string;
    recipient : string;
    noOfServices : string;
    performanceTarget: string;
    incentives: string;
    dateFrom: string;
    dateTo: string;
    statusMsg: any;
    status: any;
}

// programName: "INC TEST"
// dateFrom: "17-03-2020"
// dateTo: "31-03-2020"
// incentives: "100"
// programCode: "pc023"
// productType: "scheduledService"
// subProductType: "ssp"
// productSaleType: "retail"
// contractType: "all"
// recipient: "salesConsultant"
// performanceTarget: "lt"

// incStructureId" : null,
// "programCode" : "PC002",
// "programName" : "Cash Incentive",
// "dateFrom" : "16-mar-2020",
// "dateTo" : "25-mar-2020",
// "productType" : "Schedule Service",
// "subProductType" : "SSP",
// "productSaleType" : "Retail",
// "contractType" : "ALL",
// "recipient" : "Sales Consultant",
// "noOfServices" : "2",
// "performanceTarget" : "LT",
// "incentives" : "100"


export class DropdownValue{
    code: string;
    name: string;
}

export class CalcIncentive{
    dealerCodes : any[];
    programCodes : any[];
}