//////////////////////////////////////
// dbservice.ts
// @ Author Brian
////////////////////////////////////////

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

class User {
  account: string;
  name: string;
  surname: string;
  email: string;
  address: string;
  comments: string;
}

@Injectable({
  providedIn: 'root'
})
export class DbService {
    //*
    dataUrl: string = "./assets/prdata.json";
    dataApi: string = "http://127.0.0.1:8000/api/v1/products";
    proApi: string = "http://127.0.0.1:8000/api/products";
    pstoreApi: string = "http://127.0.0.1:8000/api/v1/products/store";
    regApi: string = "http://127.0.0.1:8000/api/register";
    logApi: string = "http://127.0.0.1:8000/api/register/login";
    logoutApi: string = "http://127.0.0.1:8000/api/register/logout";
    //*/
    /*
    dataUrl: string = "./assets/prdata.json";
    dataApi: string = "https://mkovse.herokuapp.com/api/v1/products";
    proApi: string = "https://mkovse.herokuapp.com/api/products";
    pstoreApi: string = "https://mkovse.herokuapp.com/api/v1/products/store";
    regApi: string = "https://mkovse.herokuapp.com/api/register";
    logApi: string = "https://mkovse.herokuapp.com/api/register/login";
    logoutApi: string = "https://mkovse.herokuapp.com/api/register/logout";
    */
    doneApi = false;
    headerOp;
    xbusket = "Online Shop:";
    ybusket;
    login = false;
    refn;
    user = [];
    token;
    //account;
    //name;
    //surname;
    //email;
    //address;
    //comments;

    constructor(private httpClient: HttpClient,
      private router: Router) {
      this.headerOp = new HttpHeaders();
      this.headerOp.append('Content-Type', 'application/json');
    }

    getProducts(){
        //alert(this.dataUrl);
        return this.httpClient.get(this.dataUrl);
    }

    getProductsApi(){
      if(this.login){
        this.doneApi = true;
        //alert(this.dataApi);
        let pUrl = document.URL;
        //alert("Api: "+pUrl);
        console.log("Api: "+pUrl);
        return this.httpClient.get(this.dataApi+"?PHPSESSID="+this.token, this.headerOp);
      }else{
        console.log("Please login to Shop Online.");
        //alert("Please login to Shop Online.");
        this.router.navigate(['/login']);
      }
    }

    getProductPro(){
        //alert(this.proApi);
        let pUrl = document.URL;
        //alert(pUrl);
        console.log(pUrl);
        return this.httpClient.get(this.proApi);
    }

    reqData(res){
      //alert(res);
      let done = false;
      let data = [{
        'code': '001',
        'name': 'awesome001',
        'description': 'awesome001',
        'price': '240.99'}];
      let data2;
      let http = new XMLHttpRequest();
      http.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
          data2 = JSON.parse(this.responseText);
          //alert(data2);
          done = true;
          console.log(data2);
          return data2;
        }
      };
      http.open("GET", res, true);
      http.send();
      if(done){
        //alert(done);
      }else{
        console.log(data);
        //document.write(data);
        return data;
      }
    }

    getBusketDate(){
        return new Date();
    }

    registerUsers(data){
      return this.httpClient.post(this.regApi+"?data="+data, this.headerOp);
    }

    loginUsers(data){
      return this.httpClient.post(this.logApi+"?data="+data, this.headerOp);
    }

    logoutUsers(data){
      return this.httpClient.get(this.logoutApi, data);
    }

    xybusket(x, y){
      this.xbusket = x;
      this.ybusket = y;
    }
}
