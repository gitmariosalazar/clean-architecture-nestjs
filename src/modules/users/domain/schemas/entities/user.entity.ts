export class User {
  private id_user: number;
  private address: string;
  private email: string;
  private firstname: string;
  private identification: string;
  private lastname: string;
  private password: string;
  private phone: string;

  constructor(
    id_user: number,
    address: string,
    email: string,
    firstname: string,
    identification: string,
    lastname: string,
    password: string,
    phone: string,
  ) {
    this.id_user = id_user;
    this.address = address;
    this.email = email;
    this.firstname = firstname;
    this.identification = identification;
    this.lastname = lastname;
    this.password = password;
    this.phone = phone;
  }

  // Getters
  public getIdUser(): number {
    return this.id_user;
  }

  public getAddress(): string {
    return this.address;
  }

  public getEmail(): string {
    return this.email;
  }

  public getFirstname(): string {
    return this.firstname;
  }

  public getIdentification(): string {
    return this.identification;
  }

  public getLastname(): string {
    return this.lastname;
  }

  public getPassword(): string {
    return this.password;
  }

  public getPhone(): string {
    return this.phone;
  }

  // Setters
  public setIdUser(id_user: number): void {
    this.id_user = id_user;
  }

  public setAddress(address: string): void {
    this.address = address;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public setFirstname(firstname: string): void {
    this.firstname = firstname;
  }

  public setIdentification(identification: string): void {
    this.identification = identification;
  }

  public setLastname(lastname: string): void {
    this.lastname = lastname;
  }

  public setPassword(password: string): void {
    this.password = password;
  }

  public setPhone(phone: string): void {
    this.phone = phone;
  }
}
