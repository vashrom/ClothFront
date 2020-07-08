import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {ProductComponent} from "./components/product/product.component";
import {CartComponent} from "./components/cart/cart.component";
import {CheckoutComponent} from "./components/checkout/checkout.component";
import {ThankyouComponent} from "./components/thankyou/thankyou.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {AuthGuardService} from "./guard/auth-guard.service";



const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'product/:id', component: ProductComponent
  },
  {
    path: 'cart', component: CartComponent
  },
  {
    path: 'checkout',component: CheckoutComponent
  },
  {
    path: 'thankyou',component: ThankyouComponent
  },
  {
    path: 'profile',component: ProfileComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'login',component: LoginComponent
  },
  {
    path: 'register',component: RegisterComponent
  },



];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
