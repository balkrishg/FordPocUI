
export class CalcIncentive{
    dealerCodes : any[];
    programCodes : any[];
}

export class IncentiveList{
    dealerCode: string;
    dealerName: string;
    programCode: string;
    subProductType: string;
    noOfClaimsAllowed2: number;
    noOfClaimsAllowed3: number;
    noOfClaimsAllowed4: number;
    noOfClaimsAllowed7: number;
    targetAchieved: number;
    target: number;
    achievedPercentage: number;
    incentiveCategory: number;
    total: number;
    dealerTargetMonth: string;

}
export class Incentive extends IncentiveList{
    id: Number;
}

