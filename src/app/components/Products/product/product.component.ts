import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ProductService} from "../../../services/product.service";
import {CartService} from "../../../services/cart.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {map} from "rxjs/operators";
import {ProductModelServer, ProductServerResponse} from "../../../models/product.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

declare let $: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, AfterViewInit {
  id: number;
  product;
  offeredProducts: ProductModelServer[] = [];

  thumbImages: any[] = [];
  size: string;
  color: string;

  modalRef: BsModalRef;



  @ViewChild('quantity') quantityInput;

  constructor(private modalService: BsModalService ,private productService: ProductService, private cartService: CartService, private route: ActivatedRoute, private http: HttpClient, private router: Router) { }


  ngOnInit(): void {

    this.route.paramMap.pipe(
      map((param: ParamMap) => {
        // @ts-ignore
        return param.params.id;
      })
    ).subscribe(prodId => {
      this.id = prodId;

      this.productService.getSingleProduct(this.id,window.localStorage.getItem('language')).subscribe(prod =>{
        this.product = prod;
        if(prod.images !== null){
          this.thumbImages = prod.images.split(';');
        }
      })
    });

    this.productService.getAllProducts(window.localStorage.getItem('language')).subscribe((prods: ProductServerResponse) => {
      this.offeredProducts = prods.products;
      console.log(this.offeredProducts);
    });

  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngAfterViewInit(): void {
    $(window).on('load', function () {
      $(".loader").fadeOut();
      $("#preloder").delay(200).fadeOut("slow");
    });

    /*------------------
        Product Slider
    --------------------*/
    $(".product-slider").owlCarousel({
      loop: true,
      margin: 25,
      nav: true,
      items: 4,
      dots: true,
      navText: ['<i class="ti-angle-left"></i>', '<i class="ti-angle-right"></i>'],
      smartSpeed: 1200,
      autoHeight: false,
      autoplay: true,
      responsive: {
        0: {
          items: 1,
        },
        576: {
          items: 2,
        },
        992: {
          items: 2,
        },
        1200: {
          items: 3,
        }
      }
    });

    /*------------------
       logo Carousel
    --------------------*/
    $(".logo-carousel").owlCarousel({
      loop: false,
      margin: 30,
      nav: false,
      items: 5,
      dots: false,
      navText: ['<i class="ti-angle-left"></i>', '<i class="ti-angle-right"></i>'],
      smartSpeed: 1200,
      autoHeight: false,
      mouseDrag: false,
      autoplay: true,
      responsive: {
        0: {
          items: 3,
        },
        768: {
          items: 5,
        }
      }
    });

    /*-----------------------
       Product Single Slider
    -------------------------*/
    $(".ps-slider").owlCarousel({
      loop: false,
      margin: 10,
      nav: true,
      items: 3,
      dots: false,
      navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
      smartSpeed: 1200,
      autoHeight: false,
      autoplay: true,
    });

    /*------------------

    /*-------------------
		Range Slider
	--------------------- */
    var rangeSlider = $(".price-range"),
      minamount = $("#minamount"),
      maxamount = $("#maxamount"),
      minPrice = rangeSlider.data('min'),
      maxPrice = rangeSlider.data('max');
    rangeSlider.slider({
      range: true,
      min: minPrice,
      max: maxPrice,
      values: [minPrice, maxPrice],
      slide: function (event, ui) {
        minamount.val('$' + ui.values[0]);
        maxamount.val('$' + ui.values[1]);
      }
    });
    minamount.val('$' + rangeSlider.slider("values", 0));
    maxamount.val('$' + rangeSlider.slider("values", 1));

    /*-------------------
		Radio Btn
	--------------------- */
    $(".fw-size-choose .sc-item label, .pd-size-choose .sc-item label").on('click', function () {
      $(".fw-size-choose .sc-item label, .pd-size-choose .sc-item label").removeClass('active');
      $(this).addClass('active');
    });

    /*-------------------
		Nice Select
    --------------------- */
    $('.sorting, .p-show').niceSelect();

    //

    $('.product-pic-zoom').zoom();

    /*-------------------
		Quantity change
	--------------------- */
    var proQty = $('.pro-qty');
    proQty.prepend('<span class="dec qtybtn">-</span>');
    proQty.append('<span class="inc qtybtn">+</span>');
    proQty.on('click', '.qtybtn', function () {
      var $button = $(this);
      var oldValue = $button.parent().find('input').val();
      if ($button.hasClass('inc')) {
        var newVal = parseFloat(oldValue) + 1;
      } else {
        // Don't allow decrementing below zero
        if (oldValue > 0) {
          var newVal = parseFloat(oldValue) - 1;
        } else {
          newVal = 0;
        }
      }
      $button.parent().find('input').val(newVal);
    });
  }

  addToCart(id: number) {
    this.cartService.addProductToCart(id, this.quantityInput.nativeElement.value, this.size, this.color);
    //console.log(this.size);


  }

  Increase() {
    let value = parseInt(this.quantityInput.nativeElement.value);
    if (this.product.quantity >= 1){
      value++;

      if (value > this.product.quantity) {
        // @ts-ignore
        value = this.product.quantity;
      }
    } else {
      return;
    }

    this.quantityInput.nativeElement.value = value.toString();
  }

  Decrease() {
    let value = parseInt(this.quantityInput.nativeElement.value);
    if (this.product.quantity > 0){
      value--;

      if (value <= 0) {
        // @ts-ignore
        value = 0;
      }
    } else {
      return;
    }
    this.quantityInput.nativeElement.value = value.toString();
  }

  ClothSize(size: string) {
    this.size = size;

  }

  ClothColor(color: string) {
    this.color = color;
    console.log(this.color);

  }

  selectProduct(id: number) {
    this.router.navigate(['/product',id]).then();
  }
  AddToCart(id: number, size:string) {
    this.cartService.addProductToCart(id, 1,size);
  }

}
