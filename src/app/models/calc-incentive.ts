
export class CalcIncentive {
    dealerCodes: any[];
    programCode: string;
    incentiveFrom: string;
    incentiveTo: string;
    
}

export class IncentiveList {
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
    amountEarnedCA2: number;
    amountEarnedCA3: number;
    amountEarnedCA4: number;
    amountEarnedCA7: number;
    incentiveMonth: string;
}
export class Incentive extends IncentiveList {
    id: number;
}

