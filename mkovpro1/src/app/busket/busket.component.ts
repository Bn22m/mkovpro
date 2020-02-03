import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbService } from '../dbservice';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-busket',
  templateUrl: './busket.component.html',
  styleUrls: ['./busket.component.css']
})
export class BusketComponent implements OnInit {
  bgForm: FormGroup;
  logDate;
  title;
  byInfo;
  buyInfo;
  divB;
  divC;
  divOnline;
  divOffline;
  tabPro;
  submitted = false;
  success = false;
  products;
  productsApi;
  private productsData = [];
  pbusket;
  xbusket;
  ybusket;
  name;
  email;
  refn;
  address;
  address2;
  account;
  buy;
  pay;
  divOrder;
  divBuy;
  binfo;
  productcode;

  constructor(private formBuilder: FormBuilder,
    private dataService: DbService,
    private shopService: ShopService) {
      this.logDate = this.dataService.getBusketDate();
      //this.products = this.dataService.getProducts();
      this.productsApi = this.dataService.getProductsApi();
      this.productsApi.subscribe(res =>{
        this.productsData = res["products"] as string [];
      });
      //alert(this.dataService.user.name);
      this.divB = document.getElementById("divT");
      this.divB.style = "background-color: "+this.randColor()+" ";
      this.divB.style.display = "block";
      this.title = "Online Shopping: "+this.logDate;
      this.byInfo = 0;
      this.buyInfo = "Buy Now";
      this.binfo = " ";
      this.divC = document.getElementById("divR");
      this.divC.style = "background-color: "+this.randColor()+" ";

      this.divOffline = document.getElementById("divOff");
      this.divOffline.style.display = "none";

      this.divOnline = document.getElementById("divOn");
      this.divOnline.style.display = "block";

      this.tabPro = document.getElementById("tblPro");
      this.tabPro.style.display = "none";
      this.pbusket = document.getElementById("lstB");
      this.pbusket.value = "0.00";

      this.xbusket = this.dataService.xbusket;
      this.ybusket = this.dataService.ybusket;
      this.buy = " ";
      this.pay = "0";
      this.productcode = " ";
  }
  ngOnInit() {
    this.bgForm = this.formBuilder.group({
      inShop: ['', Validators.required],
      inPay: ['', Validators.required],
      inName: ['', Validators.required],
      inEmail: ['', Validators.required],
      inAddress: ['', Validators.required],
      inRef: ['', Validators.required],
      inAcc: ['', Validators.required],
      inCode: ['', Validators.required]
    });
    this.account = this.dataService.user.account;
    this.name = this.dataService.user.name;
    this.email = this.dataService.user.email;
    this.address = this.dataService.user.address;
    this.refn = this.dataService.refn;
  }
  get fld(){ return this.bgForm.controls; }

  buyNow(){
    this.buy = document.getElementById("txtBuy").value;
    this.pay = document.getElementById("txtPay").value;
    document.getElementById("lstB").value = this.pay;
    //this.address = document.getElementById("inAddress").value;
    //this.dataService.user.address = this.address;
    this.divOrder = document.getElementById("divOrder");
    this.divOrder.style.display = "block";
    this.divBuy = document.getElementById("divBuy");
    this.divBuy.style.display = "none";
    this.binfo = "@"+this.buy+": "+this.pay;
  }

  info(data){
    //alert(this.address);
    let buyd = document.getElementById("txtBuy");
    let payd = document.getElementById("txtPay");
    buyd.value = data.name;
    payd.value = data.price;
    this.byInfo++;
    this.buyInfo = "#"+this.byInfo+" "+data.name+" "+data.price+" ";
    this.pbusket.value = data.price;
    this.binfo = "#"+this.byInfo+" "+data.name+" "+data.price+" ";

    //this.pbusket = payd.value;
    //this.fld.inShop.value = buyd.value;
    //this.fld.inPay.value = payd.value;
    this.buy = data.name;
    this.pay = data.price;
    this.productcode = data.code;
    //document.getElementById("lstB").value = data.price;

    this.dataService.xybusket(this.byInfo, payd.value);
    this.xbusket = this.dataService.xbusket;
    this.ybusket = this.dataService.ybusket;

  }

  reset(){
    let buyd = document.getElementById("txtBuy");
    let payd = document.getElementById("txtPay");
    buyd.value = "More";
    payd.value = "0.10";
    this.byInfo = 0;
    this.buyInfo = "By Now";
    this.pbusket.value = payd.value;

    this.dataService.xybusket(0, 0);
  }

  randColor(){
    let rColors = ["gold", "green", "blue", "yellow"];
    let x = Math.random();
    let y = Math.floor(x * 300);
    let z = rColors.length;
    x = y % z;
    return rColors[x];
  }

  buyOK(){
    //this.buy = document.getElementById("txtBuy").value;
    //this.pay = document.getElementById("txtPay").value;
    this.address2 = document.getElementById("inAddress").value;
    let xl = this.address2.length;
    //alert( this.buy+": "+this.pay+" "+this.address2+", @"+xl);
    if(this.pay == 0 || xl < 5 ){
        this.success = false;
        this.buyInfo = "Data Erro...";
        return;
    }
    this.success = true;
    this.buyInfo = "Data Processing...";
    this.dataService.user.address = this.address2;
    let rfDate = new Date();
    let ref = rfDate.getTime();
    let shopping = {
        "ref": ref,
        "buy": this.buy,
        "code": this.productcode,
        "pay": this.pay,
        "date": rfDate,
        "dateCaptured": this.logDate,
        "name": this.dataService.user.name,
        "account": this.dataService.user.account,
        "email": this.dataService.user.email,
        "address": this.dataService.user.address,
        "orderRef": this.dataService.refn,
        "token": this.dataService.token,
        "ref3": "0"
    };
    let datad = JSON.stringify(shopping);
    //alert(datad);
    //alert(shopping["token"]);
    console.log(shopping["token"]);
    let infob = this.shopService.order(datad);
    this.buyInfo = "Processing..."+ref;
    //
    let dataR = [];
    infob.subscribe(res =>{
      dataR = res["ref3"] as string [];
      console.log(dataR["ref1"]);
      console.log(dataR["ref2"]);
      console.log(dataR["info"]);
      if(dataR["ref2"] == 0){
        //this.router.navigate(['/busket']);
        this.reset();
        this.buyInfo = "Done: "+shopping["buy"]+", "+shopping["pay"]+"\n Ref: "+shopping["ref"];
        this.dataService.refn = dataR["ref1"];
        this.dataService.token = dataR["token"];
        this.shopService.token = dataR["token"];
        this.divOrder = document.getElementById("divOrder");
        this.divOrder.style.display = "none";
        this.divBuy = document.getElementById("divBuy");
        this.divBuy.style.display = "block";
        this.binfo = "Done: "+shopping["buy"]+", "+shopping["pay"]+"\n Ref: "+shopping["orderRef"];
        //console.log(dataR["token"]);
      } else {
        this.buyInfo = "System error:"+ref+", #"+dataR["info"]+": "+dataR["ref2"];
      }
    });
    //
    //this.reset();
    //this.buyInfo = "Done: "+shopping[0]["buy"]+", "+shopping[0]["pay"]+"\n Ref: "+shopping[0]["ref"];
    //this.reset();
  }
}
