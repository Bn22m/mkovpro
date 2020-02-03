//////////////////////////////////////
// register.component.ts
// @ Author Brian
////////////////////////////////////////

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl ,Validators } from '@angular/forms';
import { DbService } from '../dbservice';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    rgForm: FormGroup;
    type: string = "Customer";
    regDate;
    regColor;
    submitted = false;
    success = false;
    private inDate;
    private regInfo;

    constructor(private formBuilder: FormBuilder,
      private dataService: DbService,
      private router: Router) {
        this.regDate = this.dataService.getBusketDate();
        let divB = document.getElementById("divT");
        divB.style.display = "none";
        this.regInfo = "Registration";
    }

    ngOnInit() {
        this.rgForm = this.formBuilder.group({
            surnameN: ['', Validators.required],
            nameN: ['', Validators.required],
            emailN: ['', [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]],
            passwordN: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
            addressN: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(240)]]
        });
    }

    get fld(){ return this.rgForm.controls; }

    registerUser(){
        //alert(this.fld.nameN.value);
        this.submitted = true;
        if(this.rgForm.invalid){
            this.regInfo = "data error..";
            this.success = false;
            return;
        }
        this.success = true;
        let rfDate = new Date();
        let ref = rfDate.getTime();
        let address = " "+this.fld.addressN.value+" "
        let reg = {
            "name": this.fld.nameN.value,
            "surname": this.fld.surnameN.value,
            "email": this.fld.emailN.value,
            "password": this.fld.passwordN.value,
            "address": address,
            "ref": ref,
            "type": this.type
        };
        console.log(reg);
        console.log(reg.name);
        let datad = JSON.stringify(reg);
        //alert(datad);
        let dataR = [];
        let info = this.dataService.registerUsers(datad);
        info.subscribe(res =>{
          dataR = res["ref3"] as string [];
          console.log(dataR["ref1"])
          if(dataR["ref2"] == 0){
            this.regInfo = "Done:"+ref+", #"+dataR["ref1"];
            this.router.navigate(['/login']);
          } else {
            this.regInfo = "System error:"+ref+", #"+info+": "+dataR["ref2"];
          }
        });
    }

    reset(){
        try{
        this.regColor = this.randColor();
        console.log(this.regColor);
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

    registerNow(){
    }
}
