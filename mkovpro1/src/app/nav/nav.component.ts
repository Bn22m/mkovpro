//////////////////////////////////////
// nav.component.ts
// @ Author Brian
////////////////////////////////////////

import { Component, OnInit } from '@angular/core';
import { DbService } from '../dbservice';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  appTitle = "Mkoveniso";
  xbusket;
  ybusket;
  constructor(private dataService: DbService) {
  }

  ngOnInit() {
    this.xbusket = this.dataService.xbusket;
  }

  busketAdd(){
  }

  busketInfo(){
    this.ybusket = this.dataService.ybusket;
  }

}
