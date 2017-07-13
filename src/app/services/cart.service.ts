import { Injectable } from '@angular/core';
import { StorageService } from "app/services/storage.service";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { CartItem } from "../modules/cart-item/cart-item.module";
import { Collection } from "../modules/collection/collection.module";
import { Cart } from "../modules/cart/cart.module";
import { CollectionsDataService } from "../services/collections.service";

const CART_KEY = "cart";

@Injectable()
export class CartService {
  private storage: Storage;
  private subscriptionObservable: Observable<Cart>;
  private subscribers: Array<Observer<Cart>> = new Array<Observer<Cart>>();
  private collections: Collection[];

  public constructor(private storageService: StorageService,
                     private collectionService: CollectionsDataService) {
    this.storage = this.storageService.get();
    this.collectionService.all().subscribe((collections) => this.collections = collections);

    this.subscriptionObservable = new Observable<Cart>((observer: Observer<Cart>) => {
      this.subscribers.push(observer);
      observer.next(this.retrieve());
      return () => {
        this.subscribers = this.subscribers.filter((obs) => obs !== observer);
      };
    });
  }

  public get(): Observable<Cart> {
    return this.subscriptionObservable;
  }

  public addItem(collection: Collection, quantity: number): void {
    const cart = this.retrieve();
    let item = cart.items.find((p) => p.collectionId === collection.id);
    if (item === undefined) {
      item = new CartItem();
      item.collectionId = collection.id;
      cart.items.push(item);
    }

    item.quantity += quantity;
    cart.items = cart.items.filter((cartItem) => cartItem.quantity > 0);
   
    this.calculateCart(cart);
    this.save(cart);
    this.dispatch(cart);
  }
  public empty(): void {
    const newCart = new Cart();
    this.save(newCart);
    this.dispatch(newCart);
  }

  private calculateCart(cart: Cart): void {
    cart.itemsTotal = cart.items
                          .map((item) => item.quantity * this.collections.find((p) => p.id === item.collectionId).price)
                          .reduce((previous, current) => previous + current, 0);
  }

  private retrieve(): Cart {
    const cart = new Cart();
    const storedCart = this.storage.getItem(CART_KEY);
    if (storedCart) {
      cart.updateFrom(JSON.parse(storedCart));
    }

    return cart;
  }

  private save(cart: Cart): void {
    this.storage.setItem(CART_KEY, JSON.stringify(cart));
  }
  
  private dispatch(cart: Cart): void {
    this.subscribers
        .forEach((sub) => {
          try {
            sub.next(cart);
          } catch (e) {
            // we want all subscribers to get the update even if one errors.
          }
        });
  }



}
