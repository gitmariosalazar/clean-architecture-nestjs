import { Document } from "mongoose";

export interface Product extends Document{
  id_product: number;
  code: string;
  description: string;
  iva: number;
  mark: string;
  name: string;
  percentage_increment: number;
  public_price: number;
  quantity: number;
  supplier_price: number;
}