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
import {BlogItemComponent} from "./components/blog-item/blog-item.component";
import {ProductAdminComponent} from "./components/product-admin/product-admin.component";
import {CommentAdminComponent} from "./components/comment-admin/comment-admin.component";
import {BlogAdminComponent} from "./components/blog-admin/blog-admin.component";
import {OrderAdminComponent} from "./components/order-admin/order-admin.component";
import {UserAdminComponent} from "./components/user-admin/user-admin.component";
import {AuthAdminGuardService} from "./guard/auth-admin-guard.service";
import {CategoryAdminComponent} from "./components/category-admin/category-admin.component";
import {NewsAdminComponent} from "./components/news-admin/news-admin.component";



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
    path: 'blog/:id',component: BlogItemComponent
  },
  {
    path: 'about',component: AboutComponent
  },
  {
    path: 'productAdmin',component: ProductAdminComponent, canActivate: [AuthAdminGuardService]
  },
  {
    path: 'commentAdmin',component: CommentAdminComponent, canActivate: [AuthAdminGuardService]
  },
  {
    path: 'blogAdmin',component: BlogAdminComponent, canActivate: [AuthAdminGuardService]
  },
  {
    path: 'orderAdmin',component: OrderAdminComponent, canActivate: [AuthAdminGuardService]
  },
  {
    path: 'usersAdmin',component: UserAdminComponent, canActivate: [AuthAdminGuardService]
  },
  {
    path: 'categoryAdmin',component: CategoryAdminComponent, canActivate: [AuthAdminGuardService]
  },
  {
    path: 'newsAdmin',component: NewsAdminComponent, canActivate: [AuthAdminGuardService]
  },




];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
