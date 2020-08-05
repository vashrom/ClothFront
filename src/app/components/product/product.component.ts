import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {CartService} from "../../services/cart.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {map} from "rxjs/operators";
import {ProductModelServer, ServerResponse} from "../../models/product.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

declare let $: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, AfterViewInit {
  id: number;
  product;
  thumbImages: any[] = [];
  size: string;
  color: string;
  private SERVER_URL = environment.SERVER_URL;


  @ViewChild('quantity') quantityInput;

  constructor( private productService: ProductService, private cartService: CartService, private route: ActivatedRoute, private http: HttpClient) { }


  ngOnInit(): void {

    this.route.paramMap.pipe(
      map((param: ParamMap) => {
        // @ts-ignore
        return param.params.id;
      })
    ).subscribe(prodId => {
      this.id = prodId;

      this.http.get<ProductModelServer>(this.SERVER_URL + '/products/'+window.localStorage.getItem('language')+'/'+this.id,{
      }).subscribe(prod =>{
        this.product = prod;
        if(prod.images !== null){
          this.thumbImages = prod.images.split(';');
        }
      })

      // this.productService.getSingleProduct(this.id).subscribe(prod => {
      //   this.product = prod;
      //   if (prod.images !== null) {
      //     this.thumbImages = prod.images.split(';');
      //   }

      //

    });


  }

  ngAfterViewInit(): void {
    $(window).on('load', function () {
      $(".loader").fadeOut();
      $("#preloder").delay(200).fadeOut("slow");
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
      var bg = $(this).data('setbg');
      $(this).css('background-image', 'url(' + bg + ')');
    });

    /*------------------
		Navigation
	--------------------*/
    $(".mobile-menu").slicknav({
      prependTo: '#mobile-menu-wrap',
      allowParentLinks: true
    });

    /*------------------
        Hero Slider
    --------------------*/
    $(".hero-items").owlCarousel({
      loop: true,
      margin: 0,
      nav: true,
      items: 1,
      dots: false,
      animateOut: 'fadeOut',
      animateIn: 'fadeIn',
      navText: ['<i class="ti-angle-left"></i>', '<i class="ti-angle-right"></i>'],
      smartSpeed: 1200,
      autoHeight: false,
      autoplay: true,
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
        CountDown
    --------------------*/
    // // For demo preview
    // var today = new Date();
    // var dd = String(today.getDate()).padStart(2, '0');
    // var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    // var yyyy = today.getFullYear();
    //
    // if(mm == 12) {
    //   mm = '01';
    //   yyyy = yyyy + 1;
    // } else {
    //   mm = parseInt(mm) + 1;
    //   mm = String(mm).padStart(2, '0');
    // }
    // var timerdate = mm + '/' + dd + '/' + yyyy;
    // // For demo preview end
    //
    // console.log(timerdate);
    //
    //
    // // Use this for real timer date
    // /* var timerdate = "2020/01/01"; */
    //
    // $("#countdown").countdown(timerdate, function(event) {
    //   $(this).html(event.strftime("<div class='cd-item'><span>%D</span> <p>Days</p> </div>" + "<div class='cd-item'><span>%H</span> <p>Hrs</p> </div>" + "<div class='cd-item'><span>%M</span> <p>Mins</p> </div>" + "<div class='cd-item'><span>%S</span> <p>Secs</p> </div>"));
    // });


    // /*----------------------------------------------------
    //  Language Flag js
    // ----------------------------------------------------*/
    //  $(document).ready(function(e) {
    //    //no use
    //    try {
    //      var pages = $("#pages").msDropdown({on:{change:function(data, ui) {
    //           var val = data.value;
    //           if(val!="")
    //              window.location = val;
    //         }}}).data("dd");
    //
    //      var pagename = document.location.pathname.toString();
    //     pagename = pagename.split("/");
    //      pages.setIndexByValue(pagename[pagename.length-1]);
    //      $("#ver").html(msBeautify.version.msDropdown);
    //    } catch(e) {
    //      // console.log(e);
    //    }
    //   $("#ver").html(msBeautify.version.msDropdown);
    //
    //   //convert
    //    $(".language_drop").msDropdown({roundedBorder:false});
    //    $("#tech").data("dd");
    //  });
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

    /*------------------
		Single Product
	--------------------*/
    $('.product-thumbs-track .pt').on('click', function(){
      $('.product-thumbs-track .pt').removeClass('active');
      $(this).addClass('active');
      var imgurl = $(this).data('imgbigurl');
      var bigImg = $('.product-big-img').attr('src');
      if(imgurl != bigImg) {
        $('.product-big-img').attr({src: imgurl});
        $('.zoomImg').attr({src: imgurl});
      }
    });

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

}
