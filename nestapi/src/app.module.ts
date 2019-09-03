import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductsController } from './products/products.controller';
import { ProductsModule } from './products/products.module';

@Module({
  //we import our db connections string here as it will connect to db when server starts
  imports: [
    ProductsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/NestX'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
