import { Component, ViewChild } from "@angular/core";
import { MatTableDataSource, PageEvent } from "@angular/material";
import { ProductService } from "../products/products.service";

@Component({
  selector: "app-products-table",
  styleUrls: ["./products-table.component.css"],
  templateUrl: "./products-table.component.html"
})
export class ProductsTableComponent {
  dataSource = new MatTableDataSource([]);
  postlistResponse: any;
  postsPerPage = 3;
  currentPage = 1;
  postCount = 0;
  displayedColumns: string[] = ["title", "description", "price"];

  constructor(public productService: ProductService) {}
  ngOnInit() {
    this.loadList(this.postsPerPage, 0);
  }
  async loadList(limit: number, pageIndex: number) {
    try {
      const dataresponse = await this.productService.getProducts();

      console.log(dataresponse);
      this.postCount = dataresponse.maxPosts;
      this.dataSource = new MatTableDataSource(dataresponse);
    } catch (err) {
      console.error(err);
    }
  }
}
