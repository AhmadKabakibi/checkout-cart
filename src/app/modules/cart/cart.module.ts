import { CartItem } from "app/modules/cart-item/cart-item.module";

export class Cart {
  public items: CartItem[] = new Array<CartItem>();
  public itemsTotal: number = 0;

  public updateFrom(src: Cart) {
    this.items = src.items;
    this.itemsTotal = src.itemsTotal;
  }
}
