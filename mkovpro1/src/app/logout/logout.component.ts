//////////////////////////////////////
// logout.component.ts
// @ Author Brian
////////////////////////////////////////

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbService } from '../dbservice';
import { ShopService } from '../shop.service';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
    bgForm: FormGroup;
    type: string = "Customer";
    email: string = "";
    password: string ="";
    logDate;
    submitted = false;
    success = false;
    private inDate;
    title;
    divOnline;
    divOffline;
    tabPro;
    info;

    constructor(private formBuilder: FormBuilder,
        private dataService: DbService,
        private shopService: ShopService) {
        this.logDate = this.dataService.getBusketDate();
        let divB = document.getElementById("divT");
        divB.style = "background-color: red";
        divB.style.display = "block";
        this.title = "Log in to Shop Online: "+this.logDate;
        let divB2 = document.getElementById("divR");
        divB2.style = "background-color: #00a1ff";

        this.divOffline = document.getElementById("divOff");
        this.divOffline.style.display = "block";

        this.divOnline = document.getElementById("divOn");
        this.divOnline.style.display = "none";

        this.tabPro = document.getElementById("tblPro");
        this.tabPro.style.display = "block";
    }

    ngOnInit() {
    }

    localDB(){
    }

    get fld(){ return this.bgForm.controls; }

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

    logoutNow(){
      this.dataService.user = [];
      this.dataService.login = false;
      this.shopService.login = false;
      this.dataService.token = "0d";
      this.shopService.token = "0s";
      this.info = this.dataService.logoutUsers("logout");
    }
}
