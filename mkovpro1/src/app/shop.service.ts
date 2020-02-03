//////////////////////////////////////
// shop.service.ts
// @ Author Brian
////////////////////////////////////////

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  //*
  orderApi: string = "http://127.0.0.1:8000/api/order";
  productApi: string = "http://127.0.0.1:8000/api/newproduct";
  //*/
  /*
  orderApi: string = "https://mkovse.herokuapp.com/api/order";
  productApi: string = "https://mkovse.herokuapp.com/api/newproduct";
  */
  login = false;
  headerOp;
  token;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.headerOp = new HttpHeaders();
    this.headerOp.append('Content-Type', 'application/json');
  }

  order(data){
    if(this.login){
      console.log(data);
      return this.httpClient.post(this.orderApi+"?data="+data, this.headerOp);
    } else{
      console.log("Please login to order.");
      //alert("Please login to order.");
      this.router.navigate(['/login']);
    }
  }

  product(data){
    if(this.login){
      console.log(data);
      return this.httpClient.post(this.productApi+"?data="+data, "PHPSESSID="+this.token, this.headerOp);
    } else{
      console.log("Please login to ...");
      //alert("Please login to ....");
      this.router.navigate(['/login']);
    }
  }
}
