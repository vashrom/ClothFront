import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./components/Products/home/home.component";
import {ProductComponent} from "./components/Products/product/product.component";
import {CartComponent} from "./components/Order/cart/cart.component";
import {CheckoutComponent} from "./components/Order/checkout/checkout.component";
import {ThankyouComponent} from "./components/Order/thankyou/thankyou.component";
import {ProfileComponent} from "./components/Auth/profile/profile.component";
import {LoginComponent} from "./components/Auth/login/login.component";
import {RegisterComponent} from "./components/Auth/register/register.component";
import {AuthGuardService} from "./guard/auth-guard.service";
import {IndexComponent} from "./components/Main/index/index.component";
import {PayinfoComponent} from "./components/Pages/payinfo/payinfo.component";
import {ReturnComponent} from "./components/Pages/return/return.component";
import {ContactsComponent} from "./components/Pages/contacts/contacts.component";
import {BlogComponent} from "./components/Blogs/blog/blog.component";
import {AboutComponent} from "./components/Pages/about/about.component";
import {CategoryComponent} from "./components/Products/category/category.component";
import {BlogItemComponent} from "./components/Blogs/blog-item/blog-item.component";
import {ProductAdminComponent} from "./components/Admin/product-admin/product-admin.component";
import {CommentAdminComponent} from "./components/Admin/comment-admin/comment-admin.component";
import {BlogAdminComponent} from "./components/Admin/blog-admin/blog-admin.component";
import {OrderAdminComponent} from "./components/Admin/order-admin/order-admin.component";
import {UserAdminComponent} from "./components/Admin/user-admin/user-admin.component";
import {AuthAdminGuardService} from "./guard/auth-admin-guard.service";
import {CategoryAdminComponent} from "./components/Admin/category-admin/category-admin.component";
import {NewsAdminComponent} from "./components/Admin/news-admin/news-admin.component";
import {MainImageAdminComponent} from "./components/Admin/main-image-admin/main-image-admin.component";
import {CollectionComponent} from "./components/Products/collection/collection.component";
import {CollectionAdminComponent} from "./components/Admin/collection-admin/collection-admin.component";


let routes: Routes;
routes = [
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
    path: 'checkout', component: CheckoutComponent
  },
  {
    path: 'thankyou', component: ThankyouComponent
  },
  {
    path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'payinfo', component: PayinfoComponent
  },
  {
    path: 'return', component: ReturnComponent
  },
  {
    path: 'contacts', component: ContactsComponent
  },
  {
    path: 'blog', component: BlogComponent
  },
  {
    path: 'blog/:id', component: BlogItemComponent
  },
  {
    path: 'about', component: AboutComponent
  },
  {
    path: 'productAdmin', component: ProductAdminComponent, canActivate: [AuthAdminGuardService]
  },
  {
    path: 'commentAdmin', component: CommentAdminComponent, canActivate: [AuthAdminGuardService]
  },
  {
    path: 'blogAdmin', component: BlogAdminComponent, canActivate: [AuthAdminGuardService]
  },
  {
    path: 'orderAdmin', component: OrderAdminComponent, canActivate: [AuthAdminGuardService]
  },
  {
    path: 'usersAdmin', component: UserAdminComponent, canActivate: [AuthAdminGuardService]
  },
  {
    path: 'categoryAdmin', component: CategoryAdminComponent, canActivate: [AuthAdminGuardService]
  },
  {
    path: 'newsAdmin', component: NewsAdminComponent, canActivate: [AuthAdminGuardService]
  },
  {
    path: 'imagesAdmin', component: MainImageAdminComponent, canActivate: [AuthAdminGuardService]
  },
  {
    path: 'collectionAdmin', component: CollectionAdminComponent, canActivate: [AuthAdminGuardService]
  },
  {
    path: 'collection/:collName', component: CollectionComponent
  },
  {path: '**', redirectTo: '/'}



];




@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
