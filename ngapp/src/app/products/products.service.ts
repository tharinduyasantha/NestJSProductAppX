import { Injectable } from "@angular/core";
import { IProduct } from "./product.model";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
const BACKEND_URL = environment.apiUrl + "products";

@Injectable({ providedIn: "root" })
export class ProductService {
  constructor(private http: HttpClient) {}

  addPost(name: string, description: string, price: string) {
    return this.http
      .post<{ post: IProduct }>(BACKEND_URL, {
        name,
        description,
        price
      })
      .toPromise();
  }
  getProducts(): Promise<any> {
    //const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    return this.http.get<{ post: IProduct }>(BACKEND_URL).toPromise();
  }
}
