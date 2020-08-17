import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {CartService} from "../../services/cart.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ProductModelServer, ProductServerResponse} from "../../models/product.model";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BlogModelServer} from "../../models/blog.model";
import {BlogService} from "../../services/blog.service";
import {BlogServerResponse} from "../../models/blog.model";
import {ImageService} from "../../services/image.service";
import {Image, ImageModelServer, ImageServerResponse} from "../../models/image.model";

declare let $: any;


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  products: ProductModelServer[] = [];
  name: string;
  blog: BlogModelServer[] = [];
  images: ImageModelServer[] =[];
  slider1: string;



  constructor(private imageService: ImageService,private productService: ProductService, private cartService: CartService, private route: ActivatedRoute, private router: Router, private http: HttpClient,private blogService: BlogService) {
    this.images = new Array<Image>()
  }

  ngOnInit(): void {

    this.blogService.getAllBlogItems().subscribe((bl: BlogServerResponse) => {
      this.blog = bl.blog.reverse();
    });

    this.imageService.getAllImages().subscribe((images: ImageServerResponse) => {
      this.images = images.images;
      this.slider1 = this.images[0].slider1_1;
      console.log(this.images)
    });






  }








  selectBlog(id: number) {
    this.router.navigate(['/blog',id]).then();
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

}
