import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { ThankyouComponent } from './components/thankyou/thankyou.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {NgxSpinnerModule} from "ngx-spinner";
import {ToastrModule} from "ngx-toastr";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {ProfileComponent} from "./components/profile/profile.component";
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {AuthenticationService} from "./services/authentication.service";
import {AuthGuardService} from "./guard/auth-guard.service";
import { IndexComponent } from './components/index/index.component';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import { PayinfoComponent } from './components/payinfo/payinfo.component';
import { ReturnComponent } from './components/return/return.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { BlogComponent } from './components/blog/blog.component';
import { AboutComponent } from './components/about/about.component';
import { CategoryComponent } from './components/category/category.component';
import { BlogItemComponent } from './components/blog-item/blog-item.component';

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
    BlogItemComponent


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    FormsModule,
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
