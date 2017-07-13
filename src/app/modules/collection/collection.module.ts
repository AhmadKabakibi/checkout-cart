export class Collection {
  public id: string;
  public price: number;
  public name: string;
  public description: string;
  public photo: string;
  
  public updateFrom(src: Collection): void {
    this.id = src.id;
    this.price = src.price;
    this.name = src.name;
    this.description = src.description;
    this.photo = src.photo;
  }
}
