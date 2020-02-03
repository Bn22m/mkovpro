import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbService } from '../dbservice';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  stoForm: FormGroup;
  stockInfo = "New Product:";
  stocks;
  title = "Admin:";
  code1;
  code2;
  error = 0;
  success = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DbService,
    private shopService: ShopService) {

  }

  ngOnInit() {
    this.stoForm = this.formBuilder.group({
      pName: ['', Validators.required],
      pDescription: ['', Validators.required],
      pPrice: ['', Validators.required],
      pQuantity: ['', Validators.required],
      pComment: ['', Validators.required],
      pRef: ['', Validators.required],
      pCode: ['', Validators.required]
    });
  }

  get fld(){ return this.stoForm.controls; }

  stock(){
    let xname = document.getElementById("txtCode").value;
    if (this.codeLogin(xname)){
      this.code1 = xname;
      this.stocks = document.getElementById("divAdm2");
      this.stocks.style.display = "block";
      document.getElementById("pRef").value = this.dataService.refn;
    }else{
      this.error++;
      document.getElementById("txtCode").value = this.error;
      if(this.error > 3 && this.dataService.login == true){
        this.router.navigate(['/busket']);
      }
      else if(this.error > 4){
        this.router.navigate(['/help']);
      }
    }

  }

  stockOK(){
    let xname = document.getElementById("pName").value;
    let xprice = document.getElementById("pPrice").value;
    let xquantity = document.getElementById("pQuantity").value;
    let xdescription = document.getElementById("pDescription").value;
    let xcomment = document.getElementById("pComment").value;
    this.code2 = document.getElementById("pCode").value;
    let xl = xname.length;
    let x2 = this.code2.length;
    alert("#"+x2+", "+xname+": "+xprice+" "+xquantity+", @"+xl);
    if(x2 < 4 || xprice == "0" || xl < 5 || xquantity == "0" ){
        this.success = false;
        this.stockInfo = "Data Erro...";
        return;
    }
    this.success = true;
    this.stockInfo = "Data Processing...";
    let rfDate = new Date();
    let ref = rfDate.getTime();
    let product = {
        "ref": ref,
        "name": xname,
        "price": xprice,
        "quantity": xquantity,
        "description": xdescription,
        "password": this.code2,
        "orderRef": this.dataService.refn,
        "comment": xcomment,
        "ref3": "0"
    };
    let datad = JSON.stringify(product);
    //alert(datad);
    let infob = this.shopService.product(datad);
    this.stockInfo = "Processing..."+ref;
    //
    let dataR = [];
    infob.subscribe(res =>{
      //alert(res);
      dataR = res["ref3"] as string [];
      console.log(dataR["ref1"]);
      console.log(dataR["ref2"]);
      console.log(dataR["info"]);
      if(dataR["ref2"] == 0){
        this.stockInfo = "Done: "+product["name"]+", "+product["price"]+"\n Ref: "+product["ref"];
      } else {
        this.stockInfo = "System error:"+ref+", #"+dataR["info"]+": "+dataR["ref2"];
      }
    });
  }

  codeLogin(xyz){
    let code3 = "Y1YxRTlQUT09Vm5jOVBRPT1WV2M5UFE9PVpFRTlQUT09VkZFOVBRPT1ZV2M5UFE9PVZGRTlQUT09VFVFOVBRPT1WMUU5UFE9PVpXYzlQUT09V25jOVBRPT1VRkU5UFE9PQ=="
    let code = xyz;
    let a = [];
    let j = 0;
    let z = btoa(code);
    let b = z.length;
    code = "c";
    for (let i = 0; i < b; i++) {
        a.push(btoa(z[i]));
        code += btoa(a[j]);
        j++;
    }
    let code2 = btoa(code);
    return (code3 == code2);
  }
}
