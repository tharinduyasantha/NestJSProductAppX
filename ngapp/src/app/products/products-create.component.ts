import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ProductService } from "./products.service";

@Component({
  selector: "app-products-create",
  templateUrl: "./products-create.component.html",
  styleUrls: ["./products-create.css"]
})
export class ProductsCreateComponent implements OnInit {
  form: FormGroup;

  constructor(public productService: ProductService) {}
  ngOnInit() {
    this.form = new FormGroup({
      product_name: new FormControl("", []),
      product_description: new FormControl("", []),
      product_price: new FormControl("", [])
    });
  }
  async AddProduct() {
    try {
      console.log("submited");
      const productresponse = await this.productService.addPost(
        this.form.value.product_name,
        this.form.value.product_description,
        this.form.value.product_price
      );
    } catch (err) {
      console.log(err);
    }
  }
}
