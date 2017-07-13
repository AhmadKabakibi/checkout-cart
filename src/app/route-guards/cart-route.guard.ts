import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { Subscription } from "rxjs/Subscription";
import { CartService } from "../services/cart.service";

@Injectable()
export class CartRouteGuard implements CanActivate {
  public constructor(private router: Router,
                     private cartService: CartService) { }

  public canActivate(): Observable<boolean> {
    return new Observable<boolean>((observer: Observer<boolean>) => {
      const cartSubscription = this.cartService
                                  .get()
                                  .subscribe((cart) => {
                                      if (cart.items.length === 0) {
                                        observer.next(false);
                                        this.router.navigate(["/"]);
                                      } else {
                                        observer.next(true);
                                      }
                                  });
      return () => cartSubscription.unsubscribe();
    });
  }
}
