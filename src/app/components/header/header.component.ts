import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CartModelServer} from "../../models/cart.model";
import {CartService} from "../../services/cart.service";
import {AuthenticationService} from "../../services/authentication.service";
import {TranslateService} from "@ngx-translate/core";
import {CategoryModelServer, CategoryServerResponse} from "../../models/category.model";
import {CategoryService} from "../../services/category.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  cartData: CartModelServer;
  cartTotal: number;
  authState: boolean;
  selectedLang: string ='en';
  dropIndex: number;
  categories: CategoryModelServer[] = [];



  constructor(private categoryService: CategoryService,public cartService: CartService, public auth: AuthenticationService, public  translate: TranslateService) { }

  ngOnInit(): void {
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
    this.cartService.cartData$.subscribe(data=> this.cartData = data);
    this.translate.use(window.localStorage.getItem('language'));
    this.selectIndex();

    this.categoryService.getAllCategories().subscribe((cats: CategoryServerResponse) => {
      this.categories = cats.category;


    });

    if(!window.localStorage.getItem('language'))
    {
      localStorage.setItem('language', 'en');
    }


  }

  selectChangeHandler(event: any){


    this.selectedLang = event.target.value;
    this.translate.use(this.selectedLang)
    localStorage.setItem('language', this.selectedLang);
    console.log(this.selectedLang);
    window.location.reload();
  }

  selectIndex()
  {
    switch (window.localStorage.getItem('language')) {
      case 'en':
        this.dropIndex = 0 ;
        break;
      case 'de':
        this.dropIndex = 1 ;
        break;
      case 'ua':
        this.dropIndex = 2 ;
        break;
      case 'ru':
        this.dropIndex = 3 ;
        break;
      default:
        this.dropIndex = 0 ;
    }
  }

}
