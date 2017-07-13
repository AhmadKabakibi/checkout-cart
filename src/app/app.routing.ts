import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { HomeComponent } from "./components/home/home.component";
import { CartRouteGuard } from "./route-guards/cart-route.guard";

@NgModule({
    exports: [RouterModule],
    imports: [
        RouterModule.forRoot([
            {
                component: HomeComponent,
                path: "**"
            }])
    ]
})
export class AppRoutingModule { }
