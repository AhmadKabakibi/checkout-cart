import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { Collection } from "app/modules/collection/collection.module";
import { Cart } from "app/modules/cart/cart.module";
import { CollectionsDataService } from "app/services/collections.service";
import { CartService } from "app/services/cart.service";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  
  public collections: Observable<Collection[]>;
  public cart: Observable<Cart>;
  public itemCount: number;

  private cartSubscription: Subscription;

  public constructor(private collectionsService: CollectionsDataService,
                     private cartService: CartService) {
  }

  public emptyCart(): void {
    this.cartService.empty();
  }

  public ngOnInit(): void {
    this.collections = this.collectionsService.all();
    this.cart = this.cartService.get();
    this.cartSubscription = this.cart.subscribe((cart) => {
      this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
    });
  }

  public ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

}
