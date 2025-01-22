import { Schema } from 'mongoose';

export const ProductSchema = new Schema({
  id_product: { type: Number },
  code: { type: String, required: true },
  description: { type: String, required: true },
  iva: { type: Number, required: true },
  mark: { type: String, required: true },
  name: { type: String, required: true },
  percentage_increment: { type: Number, required: true },
  public_price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  supplier_price: { type: Number, required: true },
});
