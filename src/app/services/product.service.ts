import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product} from '../models/product';
import { Observable } from 'rxjs';
import { ProductRule } from '../models/product-rule';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }


  private BASE_URL = 'http://fordpoc-env.eba-zmjtsxkc.us-east-1.elasticbeanstalk.com/api';

//save program

  public saveIncentiveProgram(product: Product) :Observable<any>{

    const url = `${this.BASE_URL}/ford/poc/saveIncentiveProgram`;
    return this.http.post(url, product);
  }

//get all incentive structure
 // http://localhost:8080/api/ford/poc/getAllIncentiveStructureByProgramCode/PC001
 public getAllIncentiveStructureByProgramCode(programCode: string):Observable<any>{
  const url = `${this.BASE_URL}/ford/poc/getAllIncentiveStructureByProgramCode/${programCode}`;
  return this.http.get(url);
}

 //get all incentive Program Code
  //http://localhost:8080/api/ford/poc/getAllIncentiveProgram
 public getAllIncentiveProgram():Observable<any>{
  const url = `${this.BASE_URL}/ford/poc/getAllIncentiveProgram`;
  return this.http.get(url);
}
  //save programincentive

  public saveIncentiveStructure(productRule : ProductRule):Observable<any>{
    const url = `${this.BASE_URL}/ford/poc/saveIncentiveStructure`;
    return this.http.post(url, productRule);
  }

  //to get all dealer codes 
  //http://localhost:8080/api/ford/poc/getDealerCodes

  public getAllDealerList():Observable<any>{
    const url = `${this.BASE_URL}/ford/poc/getDealerCodes`;
   return this.http.get(url);
  }


  //to get calculative incentive
  //http://localhost:8080/api/ford/poc/calculateIncentive

  public getCalculativeIncentiveList(dealerCodeList):Observable<any>{
    const url = `${this.BASE_URL}/ford/poc/calculateIncentive`;
   return this.http.get(url, dealerCodeList);
  }


  //on programcode blur

  // public getProgramDetailsByCode(programCode : string):Observable<any>{
  //   const url = `${this.BASE_URL}/ford/poc/getIncentiveProgram/${programCode}`;
  //  return this.http.get(url);
  // }

  
}