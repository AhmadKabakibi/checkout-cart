import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Collection } from "app/modules/collection/collection.module";
import { Cart } from "app/modules/cart/cart.module";
import { CollectionsDataService } from "app/services/collections.service";
import { CartService } from "app/services/cart.service";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	public collections: Observable<Collection[]>;

  public constructor(private collectionsService: CollectionsDataService,
                     private cartService: CartService) {
  }

  public addCollectionToCart(collection: Collection): void {
    this.cartService.addItem(collection, 1);
  }

  public removeCollectionFromCart(collection: Collection): void {
    this.cartService.addItem(collection, -1);
  }

  public collectionInCart(collection: Collection): boolean {
    return Observable.create((obs: Observer<boolean>) => {
      const sub = this.cartService
                      .get()
                      .subscribe((cart) => {
                        obs.next(cart.items.some((i) => i.collectionId === collection.id));
                        obs.complete();
                      });
      sub.unsubscribe();
    });
  }

  
  public ngOnInit(): void {
    this.collections = this.collectionsService.all();
  }

}
