import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductModel } from './product.model';
import { Model } from 'mongoose';

import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductsService {
  //private products: ProductModel[] = [];

  constructor(
    // this 'Product' is comming from products.module
    @InjectModel('Product') private readonly productModel: Model<ProductModel>,
  ) {}

  async insertProduct(title: string, desc: string, price: number) {
    const prodId = Math.random().toString();
    const newProduct = new this.productModel({
      title,
      description: desc,
      price,
    });

    // push keyword is to insert into the Product[]array
    // this.products.push(newProduct);

    // this is to save our object in database
    const result = await newProduct.save();
    console.log(result);
    return result.id as string;
  }
  async getProducts() {
    const products = await this.productModel.find().exec();
    //console.log(result);
    /*
    this will retrun proudcut arry in form of productmodels schema
    return products as ProductModel[];
    */

    // we can use map() to format tha _id into id
    return products.map(prod => ({
      id: prod.id,
      title: prod.title,
      description: prod.description,
      price: prod.price,
    }));

    /*
    in here we can use slice() too, this is to return current products in products array,
    if we return this.products it means the pointer to the location of this product array not with data.
    return [...this.products];

    */
  }
  async getSingleProduct(productId: string) {
    const product = await this.findProduct(productId);
    return {
      id:product.id,
      title:product.title,
      description:product.description,
      price:product.price
    };
  }
  async deleteProduct(prodId: string) {
    const result = await this.productModel.deleteOne({_id: prodId}).exec();
    if(result.n===0){
      throw new NotFoundException('Could not find product!');
      
    }


    // const index = this.findProduct(prodId)[1];
    // this.products.splice(index, 1);
  }

  async updateProduct(productId: string, title: string, desc: string, price: number) {
    
    const updateProduct = await this.findProduct(productId);
    
    // this is to make sure not to update same product with different feilds
    if (title) {
      updateProduct.title = title;
    }
    if (desc) {
      updateProduct.description = desc;
    }
    if (price) {
      updateProduct.price = price;
    }
    updateProduct.save();
    


    /*
    const product = this.findProduct(productId)[0 ];
    const index= this.findProduct(productId)[1];
    this implementation also can be done as below
    
    const [product, index] = this.findProduct(productId);
    const updateProduct = { ...product };
    // this is to make sure not to update same product with different feilds
    if (title) {
      updateProduct.title = title;
    }
    if (desc) {
      updateProduct.description = desc;
    }
    if (price) {
      updateProduct.price = price;
    }

    this.products[index] = updateProduct;
    */
  }

  private async findProduct(id: string): Promise<ProductModel> {
    let product;
    try{
      product = await this.productModel.findById(id);

    }catch(error){

      throw new NotFoundException('Could not find product!');
    }
    
    if (!product) {
      throw new NotFoundException('Could not find product!');
    }
    return product;
  }

  /*
  :[Product,number] this is to indicate that this function only returns an array and a number
  
  private findProduct(id: string): [ProductModel, number] {
    const productIndex = this.products.findIndex(prod => prod.id == id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Could not find product!');
    }
    return [product, productIndex];
  }*/
}
