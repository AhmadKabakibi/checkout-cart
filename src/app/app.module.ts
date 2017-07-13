import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';

import { AppRoutingModule } from "./app.routing";

import { CartRouteGuard } from "./route-guards/cart-route.guard";
import { CollectionsDataService } from "./services/collections.service";
import { CartService } from "./services/cart.service";
import { LocalStorageServie, StorageService } from "./services/storage.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    CollectionsDataService,
    CartRouteGuard,
    LocalStorageServie,
    { provide: StorageService, useClass: LocalStorageServie },
    {
      deps: [StorageService, CollectionsDataService],
      provide: CartService,
      useClass: CartService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
