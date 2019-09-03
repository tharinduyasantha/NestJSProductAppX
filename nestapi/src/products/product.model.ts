import * as mongoose from 'mongoose';
export const ProductSchema = new mongoose.Schema({
  //these data types are js data types
  title: { type: String },
  description: { type: String },
  price: { type: Number },
});
export interface ProductModel extends mongoose.Document {
  id: string;
  title: string;
  description: string;
  price: number;
}
