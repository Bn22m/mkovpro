//////////////////////////////////////
// login.component.ts
// @ Author Brian
////////////////////////////////////////

import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbService } from '../dbservice';
import { ShopService } from '../shop.service';

class User {
  account: string;
  name: string;
  surname: string;
  email: string;
  address: string;
  comments: string;
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    lgForm: FormGroup;
    type: string = "Customer";
    logDate;
    submitted = false;
    success = false;
    private inDate;
    private logInfo;

    constructor(private formBuilder: FormBuilder,
      private dataService: DbService,
      private router: Router,
      private shopService: ShopService) {
        this.logDate = this.dataService.getBusketDate();
        let divB = document.getElementById("divT");
        divB.style.display = "none";
        this.logInfo = "Login";
    }

    ngOnInit() {
        this.lgForm = this.formBuilder.group({
            emailN: ['', [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]],
            passwordN: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(29)]]
        });
    }

    localDB(){
    }

    get fld(){ return this.lgForm.controls; }

    loginUser(){
        //alert("login..");
        this.submitted = true;
        if(this.lgForm.invalid){
            this.logInfo = "Data error...";
            this.success = false;
            return;
        }
        this.success = true;
        let rfDate = new Date();
        let ref = rfDate.getTime();
        //alert(ref);
        let log = {
            "email": this.fld.emailN.value,
            "password": this.fld.passwordN.value,
            "ref": ref,
            "type": this.type
        };
        let datad = JSON.stringify(log);
        //alert(datad);
        let info = this.dataService.loginUsers(datad);
        this.logInfo = "OK"+ref;
        //
        let dataR = [];
        //let data = [];
        info.subscribe(res =>{
          dataR = res["ref3"] as string [];
          console.log(dataR["ref1"]);
          console.log(dataR["ref2"]);
          console.log(dataR["info"]);
          if(dataR["ref2"] == 0){
            //this.dataService.user = dataR["login"] as string [];
            this.dataService.user = dataR["login"] as User [];
            this.dataService.login = true;
            this.shopService.login = true;
            this.dataService.refn = dataR["ref1"];
            this.dataService.token = dataR["token"];
            this.shopService.token = dataR["token"];
            console.log(dataR["token"]);
            console.log(this.shopService.token);
            console.log(this.dataService.refn);
            //alert(this.shopService.token);
            this.router.navigate(['/busket']);
          } else {
            this.logInfo = "System error:"+ref+", #"+dataR["info"]+": "+dataR["ref2"];
          }
        });
        //
    }

    reset(){
        try{
        console.log("Reset...");
        }catch(e){
            console.log("Reset: "+e);
        }
    }

    randColor(){
      let rColors = ["colors.red", "colors.green", "colors.blue", "colors.yellow"];
      let x = Math.random();
      let y = Math.floor(x * 300);
      let z = rColors.length;
      x = y % z;
      return rColors[x];
    }

    loginNow(){
    }
}
