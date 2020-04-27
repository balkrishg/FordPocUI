export class Product {
    programCode: string;
    programName: string;
    dateFrom: string;
    dateTo: string;
    payoutFrequency: string;
    // standardSSP : string = "false";
    // freeSSP     : string = "false";
    // flexiSSP    : string = "false";
    // flexiEW     : string ="false";
    // scheduleService: string = "false";

}


export class Status extends Product{
    status : string;
    statusMsg: string;
} 