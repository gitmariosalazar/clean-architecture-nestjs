import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'product' })
export class ProductEntity {
  @PrimaryColumn({ name: 'id_product' })
  public id_product?: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  public code: string;

  @Column({ type: 'text' })
  public description: string;

  @Column({ type: 'float' })
  public iva: number;

  @Column({ type: 'varchar', length: 50 })
  public mark: string;

  @Column({ type: 'varchar', length: 100 })
  public name: string;

  @Column({ type: 'float', name: 'percentage_increment' })
  public percentage_increment: number;

  @Column({ type: 'float', name: 'public_price' })
  public public_price: number;

  @Column({ type: 'int' })
  public quantity: number;

  @Column({ type: 'float', name: 'supplier_price' })
  public supplier_price: number;

  constructor(
    code: string,
    description: string,
    iva: number,
    mark: string,
    name: string,
    percentage_increment: number,
    public_price: number,
    quantity: number,
    supplier_price: number,
    id_product?: number,
  ) {
    this.id_product = id_product;
    this.code = code;
    this.description = description;
    this.iva = iva;
    this.mark = mark;
    this.name = name;
    this.percentage_increment = percentage_increment;
    this.public_price = public_price;
    this.quantity = quantity;
    this.supplier_price = supplier_price;
  }

  // Getters
  public getIdProduct(): number {
    return this.id_product;
  }

  public getCode(): string {
    return this.code;
  }

  public getDescription(): string {
    return this.description;
  }

  public getIva(): number {
    return this.iva;
  }

  public getMark(): string {
    return this.mark;
  }

  public getName(): string {
    return this.name;
  }

  public getPercentageIncrement(): number {
    return this.percentage_increment;
  }

  public getPublicPrice(): number {
    return this.public_price;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public getSupplierPrice(): number {
    return this.supplier_price;
  }

  // Setters
  public setIdProduct(idProduct: number): void {
    this.id_product = idProduct;
  }

  public setCode(code: string): void {
    this.code = code;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  public setIva(iva: number): void {
    this.iva = iva;
  }

  public setMark(mark: string): void {
    this.mark = mark;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public setPercentageIncrement(percentageIncrement: number): void {
    this.percentage_increment = percentageIncrement;
  }

  public setPublicPrice(publicPrice: number): void {
    this.public_price = publicPrice;
  }

  public setQuantity(quantity: number): void {
    this.quantity = quantity;
  }

  public setSupplierPrice(supplierPrice: number): void {
    this.supplier_price = supplierPrice;
  }
}
