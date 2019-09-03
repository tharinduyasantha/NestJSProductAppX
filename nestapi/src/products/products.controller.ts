import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { error_handler, requiredFieldsValidated } from '../utils/utils';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  async addProduct(
    @Body('name') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    const generatedId = await this.productService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return generatedId;
    // const insertedObject = this.productService.insertProduct(
    //   prodTitle,
    //   prodDesc,
    //   prodPrice,
    // );
    // return insertedObject;
  }
  @Get()
  async getAllProducts() {
    try {
      const products = await this.productService.getProducts();
      return products;
    } catch (err) {
      throw 'error';
    }
    // this is how we get the products array which is inside the product service
  }

  //with this param , this is how we extract data from incoming URL from parameter list
  @Get(':id')
  async getProduct(@Param('id') prodId: string) {
    return this.productService.getSingleProduct(prodId);
  }
  @Patch(':id')
  async updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    //this is how we send to service method when we update the products
    await this.productService.updateProduct(
      prodId,
      prodTitle,
      prodDesc,
      prodPrice,
    );
  }
  @Delete(':id')
  async removeProduct(@Param('id') prodId: string) {
    await this.productService.deleteProduct(prodId);
    return null;
  }
}

/*
  
  {
    post_id,
    comment_message,
    user_id
  }
   */
// @Post('/comment')
// async addComment(@Body() body) {
//   try {
//     const validateInputs = requiredFieldsValidated(body, [
//       'post_id',
//       'comment_message',
//       'user_id',
//     ]);
//     if (validateInputs != null) {
//       throw validateInputs;
//     }

//     const data = await this.productService.getProducts();
//     return data;
//   } catch (err) {
//     throw error_handler(err);
//   }
//   // this is how we get the products array which is inside the product service
// }
