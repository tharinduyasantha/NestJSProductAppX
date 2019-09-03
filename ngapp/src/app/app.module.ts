import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AngularMaterialModule } from "./angular-material.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { ProductsCreateComponent } from "./products/products-create.component";
import { ProductsTableComponent } from "./products-table/products-table.component";
import { MatTable, MatTableModule } from "@angular/material";

@NgModule({
  declarations: [AppComponent, ProductsCreateComponent, ProductsTableComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
