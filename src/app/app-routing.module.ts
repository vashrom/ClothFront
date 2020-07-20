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
import {IndexComponent} from "./components/index/index.component";
import {PayinfoComponent} from "./components/payinfo/payinfo.component";
import {ReturnComponent} from "./components/return/return.component";
import {ContactsComponent} from "./components/contacts/contacts.component";
import {BlogComponent} from "./components/blog/blog.component";
import {AboutComponent} from "./components/about/about.component";
import {CategoryComponent} from "./components/category/category.component";



const routes: Routes = [
  {
    path: '', component: IndexComponent
  },
  {
    path: 'collection', component: HomeComponent
  },
  {
    path: 'product/:id', component: ProductComponent
  },
  {
    path: 'category/:catName', component: CategoryComponent
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
  {
    path: 'payinfo',component: PayinfoComponent
  },
  {
    path: 'return',component: ReturnComponent
  },
  {
    path: 'contacts',component: ContactsComponent
  },
  {
    path: 'blog',component: BlogComponent
  },
  {
    path: 'about',component: AboutComponent
  },


];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
