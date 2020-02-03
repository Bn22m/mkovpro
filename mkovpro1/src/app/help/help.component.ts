//////////////////////////////////////
// help.component.ts
// @ Author Brian
////////////////////////////////////////

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbService } from '../dbservice';

@Component({
    selector: 'app-help',
    templateUrl: './help.component.html',
    styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
    hgForm: FormGroup;
    title = "Help";
    type: string = "Customer";
    products;
    proPicked;
    logDate;
    busColor;
    submitted = false;
    success = false;
    private inDate;
    constructor(private formBuilder: FormBuilder, private dataService: DbService) {
        this.logDate = this.dataService.getBusketDate();
        this.products = this.dataService.getProducts();
    }

    ngOnInit() {
    }

    localDB(){
    }

    get fld(){ return this.hgForm.controls; }

    reset(){
        try{
        this.busColor = this.randColor();
        console.log(this.busColor);
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

    buyNow(){
    }
}
