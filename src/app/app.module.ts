import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartComponent } from './components/Order/cart/cart.component';
import { CheckoutComponent } from './components/Order/checkout/checkout.component';
import { HomeComponent } from './components/Products/home/home.component';
import { ProductComponent } from './components/Products/product/product.component';
import { ThankyouComponent } from './components/Order/thankyou/thankyou.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {NgxSpinnerModule} from "ngx-spinner";
import {ToastrModule} from "ngx-toastr";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {ProfileComponent} from "./components/Auth/profile/profile.component";
import { LoginComponent } from './components/Auth/login/login.component';
import { RegisterComponent } from './components/Auth/register/register.component';
import {AuthenticationService} from "./services/authentication.service";
import {AuthGuardService} from "./guard/auth-guard.service";
import { IndexComponent } from './components/Main/index/index.component';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import { PayinfoComponent } from './components/Pages/payinfo/payinfo.component';
import { ReturnComponent } from './components/Pages/return/return.component';
import { ContactsComponent } from './components/Pages/contacts/contacts.component';
import { BlogComponent } from './components/Blogs/blog/blog.component';
import { AboutComponent } from './components/Pages/about/about.component';
import { CategoryComponent } from './components/Products/category/category.component';
import { BlogItemComponent } from './components/Blogs/blog-item/blog-item.component';
import { ProductAdminComponent } from './components/Admin/product-admin/product-admin.component';
import { CommentAdminComponent } from './components/Admin/comment-admin/comment-admin.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { OrderAdminComponent } from './components/Admin/order-admin/order-admin.component';
import { BlogAdminComponent } from './components/Admin/blog-admin/blog-admin.component';
import { UserAdminComponent } from './components/Admin/user-admin/user-admin.component';
import { CategoryAdminComponent } from './components/Admin/category-admin/category-admin.component';
import { NewsAdminComponent } from './components/Admin/news-admin/news-admin.component';
import { MainImageAdminComponent } from './components/Admin/main-image-admin/main-image-admin.component';
import { CollectionComponent } from './components/Products/collection/collection.component';
import { CollectionAdminComponent } from './components/Admin/collection-admin/collection-admin.component';

import { ModalModule } from 'ngx-bootstrap/modal';

export function HttpLoaderFactory(http:HttpClient) {
  return new TranslateHttpLoader(http);

}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    CheckoutComponent,
    HomeComponent,
    ProductComponent,
    ThankyouComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    IndexComponent,
    PayinfoComponent,
    ReturnComponent,
    ContactsComponent,
    BlogComponent,
    AboutComponent,
    CategoryComponent,
    BlogItemComponent,
    ProductAdminComponent,
    CommentAdminComponent,
    OrderAdminComponent,
    BlogAdminComponent,
    UserAdminComponent,
    CategoryAdminComponent,
    NewsAdminComponent,
    MainImageAdminComponent,
    CollectionComponent,
    CollectionAdminComponent,



  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    FlashMessagesModule.forRoot(),
    TranslateModule.forRoot({
     loader: {
       provide: TranslateLoader,
       useFactory: HttpLoaderFactory,
       deps: [HttpClient]
     },
      defaultLanguage: 'en'
    })

  ],
  providers: [AuthenticationService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
