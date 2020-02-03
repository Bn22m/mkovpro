//////////////////////////////////////
// product.component.ts
// @ Author Brian
////////////////////////////////////////

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DbService } from '../dbservice';
import { ProductService } from './product.service';
import { Product } from './product.model';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
    rgForm: FormGroup;
    utype : string = "Customer";
    proPicked;
    logDate;
    busColor;
    submitted = false;
    success = false;
    private inDate;
    info;
    products;
    productb;
    productc;
    pData = [];
    datap;
    divC;
    private mproducts = [];
    private pproducts = [];
    private data = [];
    //oproducts: Object;
    //obproducts: Object;
    private productOb : Observable<Product[]>;
    private productOc : Observable<any[]>;
    moreProd = 0;
    divMp;
    divMp2;

    constructor(private formBuilder: FormBuilder,
      private dataService: DbService, private proService: ProductService) {

      this.info = this.randColor();
    }

    ngOnInit() {
      //alert(1);
      //this.products = this.dataService.getProducts();
      //this.products = this.dataService.getProductsApi();
      this.products = this.dataService.getProductPro();
      this.products.subscribe(res =>{
        console.log(res);
        this.data = res["products"] as string [];
        this.pproducts = res["products"] as string[];
        this.mproducts = res["products"] as string[];
        //alert(res);
        this.getProducts();
      });
    }

    getProductsApi(){
      this.datap = JSON.stringify(this.pData);
      this.pData = JSON.parse(this.datap);
    }

    getProducts(){
      this.pData = this.data;
      this.getProductsApi();
    }

    get fld(){ return this.rgForm.controls; }

    reset(){
        try{
        this.info = this.datap
        this.busColor = this.randColor();
        console.log(this.busColor);
        console.log("Reset...");
        this.divC = document.getElementById("divR");
        this.divC.style = "background-color: "+this.randColor()+" ";
        }catch(e){
            console.log("Reset: "+e);
        }
    }

    more(){
      this.moreProd++;
      if(this.moreProd > 2){
        this.moreProd = 0;
        this.moreProducts();
      }else{
        this.divMp = document.getElementById("divMorep");
        this.divMp2 = document.getElementById("divMorep2");
        this.divMp.style = "background-color: "+this.randColor()+" ";
        this.divMp.style.display = "block";
        this.divMp2.style.display = "none";
        this.productb = this.proService.getProductsApi();
        this.productb.subscribe(res =>{
          console.log(res);
          //alert(res);
          this.pproducts = res["products"] as string[];
        });
      }
    }

    moreProducts(){
      this.divMp = document.getElementById("divMorep");
      this.divMp2 = document.getElementById("divMorep2");
      this.divMp2.style = "background-color: "+this.randColor()+" ";
      this.divMp.style.display = "none";
      this.divMp2.style.display = "block";
      this.productc = this.proService.getProducts();
      this.productc.subscribe(res =>{
        console.log(res);
        //alert(res);
        this.mproducts = res["products"] as string[];
      });

    }

    randColor(){
      let rColors = ["red", "green", "blue", "yellow"];
      let x = Math.random();
      let y = Math.floor(x * 300);
      let z = rColors.length;
      x = y % z;
      return rColors[x];
    }
}
