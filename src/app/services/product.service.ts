import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { ProductRule } from '../models/product-rule';


// let headers: HttpHeaders = new HttpHeaders();
// headers = headers.append('Access-Control-Allow-Origin: *', 'application/json');
// headers = headers.append('access-control-allow-origin: *', 'charset=utf-8');

const httpOptions = {
  headers: new HttpHeaders({
    // 'content-type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }


  private BASE_URL = 'http://54.82.215.218:9090/api';
  // private BASE_URL = 'http://localhost:7070/api';

  //save program

  public saveIncentiveProgram(product: Product): Observable<any> {

    const url = `${this.BASE_URL}/ford/poc/saveIncentiveProgram`;
    return this.http.post(url, product);
  }

  //get all incentive structure
  // http://localhost:8080/api/ford/poc/getAllIncentiveStructureByProgramCode/PC001
  public getAllIncentiveStructureByProgramCode(programCode: string): Observable<any> {
    const url = `${this.BASE_URL}/ford/poc/getAllIncentiveStructureByProgramCode/${programCode}`;
    return this.http.get(url);
  }

  //get all incentive Program Code
  //http://localhost:8080/api/ford/poc/getAllIncentiveProgram
  public getAllIncentiveProgram(): Observable<any> {
    const url = `${this.BASE_URL}/ford/poc/getAllIncentiveProgram`;
    return this.http.get(url);
  }
  //save programincentive

  public saveIncentiveStructure(productRule: ProductRule): Observable<any> {
    const url = `${this.BASE_URL}/ford/poc/saveIncentiveStructure`;
    return this.http.post(url, productRule);
  }

  //to get all dealer codes 
  //http://localhost:8080/api/ford/poc/getDealerCodes

  public getAllDealerList(): Observable<any> {
    const url = `${this.BASE_URL}/ford/poc/getDealerCodes`;
    return this.http.get(url);
  }


  //to get calculative incentive
  //http://localhost:8080/api/ford/poc/calculateIncentive

  public getCalculativeIncentiveList(dealerCodeList): Observable<any> {
    const url = `${this.BASE_URL}/ford/poc/calculateIncentive`;
    return this.http.post(url, dealerCodeList);
  }

  public getCalculativeIncentiveReportList(dealerCodeList): Observable<any> {
    const url = `${this.BASE_URL}/ford/poc/getIncentiveCalculationReport`;
    return this.http.post(url, dealerCodeList);
  }
  public getIncentiveProgram(programCode): Observable<any> {
    const url = `${this.BASE_URL}/ford/poc/getIncentiveProgram/${programCode}`;
    return this.http.get(url);
  }


  //on programcode blur

  // public getProgramDetailsByCode(programCode : string):Observable<any>{
  //   const url = `${this.BASE_URL}/ford/poc/getIncentiveProgram/${programCode}`;
  //  return this.http.get(url);
  // }


}