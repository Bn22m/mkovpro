import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  dataApi: string = "http://127.0.0.1:8000/api/v1/products";
  proApi: string = "http://127.0.0.1:8000/api/products";

  constructor(private http: HttpClient) {}

  getProductsApi(){
    //alert(1);
    return this.http.get(this.proApi);
  }

  getProducts(){
    //alert(2);
    return this.http.get(this.dataApi);
  }
}
