import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Product} from "../model/Product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  deleteProduct(id: string | number) {
    return this.http.delete(environment.server_url+'product/'+id)
  }

  saveProduct(product: any) {
    return this.http.post<any>(environment.server_url+'product',product)
  }

   updateProduct(product: any) {
    return this.http.patch<any>(environment.server_url+'product',product)
  }

  getProducts() {
    return this.http.get<Product[]>(environment.server_url+'product')
  }



}
