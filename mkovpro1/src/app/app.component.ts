import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DbService } from './dbservice';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Mkovenic';
  data = [{
    'code': '01',
    'name': 'awesome1',
    'description': 'awesome1',
    'price': '24.99'},{
    'code': '02',
    'name': 'cool1',
    'description': 'cool1',
    'price': '54.99'},{
    'code': '03',
    'name': 'superawesome1',
    'description': 'superawesome1',
    'price': '329.99'}
  ];
  xbusket;
  ybusket;

  constructor(private dataService: DbService) {
  }

  ngOnInit() {
    this.xbusket = this.dataService.xbusket;
  }

  info(data){
    let buy = document.getElementById("txtBuy");
    let pay = document.getElementById("txtPay");
    buy.value = data.name;
    pay.value = data.price;
    this.dataService.ybusket = pay.value;
    this.ybusket = this.dataService.ybusket;
    document.getElementById("lstB").value = pay.value;
  }
  infoMore(){
    let buy = document.getElementById("txtBuy");
    let pay = document.getElementById("txtPay");
    buy.value = "More";
    pay.value = "0.00";
  }
}
