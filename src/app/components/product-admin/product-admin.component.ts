import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Product, ProductModelServer, ServerResponse} from "../../models/product.model";
import {ProductService} from "../../services/product.service";
import {CommentService} from "../../services/comment.service";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.css'],
  providers: [ProductService]
})
export class ProductAdminComponent implements OnInit {


  @ViewChild('readOnlyTemplate', {static: false}) readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate', {static: false}) editTemplate: TemplateRef<any>;

  editedProduct: Product;
  products: ProductModelServer[] = [];
  isNewRecord: boolean;
  statusMessage: string;
  sumSizes: number ;


  constructor(private productService: ProductService,private flashMessage: FlashMessagesService) {
    this.products = new Array<Product>();

  }

  ngOnInit(): void {
    this.loadProducts();

  }



  private loadProducts() {
    this.productService.getAllProducts(window.localStorage.getItem('language')).subscribe((prods: ServerResponse) => {
      this.products = prods.products.reverse();
    });
  }


  addProduct(){
    this.editedProduct = new Product(0,"","","",0, 0 ,"","","",0,"", 0,0,0,0,0,0, "","","","","","",0,0,0, "" );
    this.products.push(this.editedProduct);
      this.isNewRecord = true;
  }

  editProduct(prod: Product) {
    this.editedProduct = new Product(prod.id,prod.title,prod.category,prod.description,prod.price,prod.quantity,prod.image,prod.images,prod.size,prod.cat_id, prod.short_desc, prod.xs, prod.s, prod.m, prod.l, prod.xl, prod.xxl,prod.title_ua,prod.title_ru,prod.title_de,prod.description_ua,prod.description_ru,prod.description_de,prod.price_ua,prod.price_ru,prod.price_de, prod.color);
    console.log(prod.title);
  }

  loadTemplate(prod: Product){
    if(this.editedProduct && this.editedProduct.id === prod.id){
      return this.editTemplate;
    }
    else {
      return this.readOnlyTemplate;
    }
  }

  saveProduct(){
    if(this.isNewRecord){
      this.editedProduct.quantity = Number(this.editedProduct.xs) + Number(this.editedProduct.s) +Number(this.editedProduct.m) +Number(this.editedProduct.l) +Number(this.editedProduct.xl) +Number(this.editedProduct.xxl);
      this.productService.createProduct(this.editedProduct).subscribe((prods: ServerResponse) =>{
        this.statusMessage = "Товар успішно додано", this.loadProducts()
        this.flashMessage.show(this.statusMessage, { cssClass: 'alert-success', timeout: 2000 });

      });

      this.isNewRecord = false;
      this.editedProduct = null;

    }
    else {

      this.editedProduct.quantity = Number(this.editedProduct.xs) + Number(this.editedProduct.s) +Number(this.editedProduct.m) +Number(this.editedProduct.l) +Number(this.editedProduct.xl) +Number(this.editedProduct.xxl);
      this.productService.updateProduct(this.editedProduct.id,this.editedProduct).subscribe((prods: ServerResponse) => {
        this.statusMessage = "Товар успішно оновлено", this.loadProducts()
        this.flashMessage.show(this.statusMessage, { cssClass: 'alert-success', timeout: 2000 });

      });

      this.editedProduct = null;
    }
  }

  cancel() {
    if(this.isNewRecord){
      this.products.pop();
      this.isNewRecord = false;
    }
    this.editedProduct = null;
  }

  deleteProduct(prod: Product) {
    this.productService.deleteProduct(prod.id).subscribe((prods: ServerResponse) => {
      this.statusMessage = "Товар успішно видалено", this.loadProducts();
      this.flashMessage.show(this.statusMessage, { cssClass: 'alert-success', timeout: 2000 });

    });
  }



}
