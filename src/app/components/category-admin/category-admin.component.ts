import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Blog, BlogModelServer, BlogServerResponse} from "../../models/blog.model";
import {Category, CategoryModelServer, CategoryServerResponse} from "../../models/category.model";
import {BlogService} from "../../services/blog.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {CategoryService} from "../../services/category.service";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-category-admin',
  templateUrl: './category-admin.component.html',
  styleUrls: ['./category-admin.component.css']
})
export class CategoryAdminComponent implements OnInit {

  @ViewChild('readOnlyTemplate', {static: false}) readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate', {static: false}) editTemplate: TemplateRef<any>;

  editedCategory: Category;
  categories: CategoryModelServer[] = [];
  isNewRecord: boolean;
  statusMessage: string;
  private SERVER_URL = environment.SERVER_URL;

  constructor(private categoryService: CategoryService,private flashMessage: FlashMessagesService,private http: HttpClient) {
    this.categories = new Array<Category>();

  }

  ngOnInit(): void {
    this.loadCategories();
  }

  private loadCategories() {
    return this.http.get<CategoryServerResponse>(this.SERVER_URL + '/category', {}).subscribe((category: CategoryServerResponse) => {
      this.categories = category.category.reverse();
    });
  }

  addCategory(){
    this.editedCategory = new Category(0,"","","","","");
    this.categories.push(this.editedCategory);
    this.isNewRecord = true;
  }

  editCategory(category: Category) {
    this.editedCategory = new Category(category.id,category.title,category.title_ua,category.title_ru,category.title_de, category.title_en);
  }

  loadTemplate(category: Category){
    if(this.editedCategory && this.editedCategory.id === category.id){
      return this.editTemplate;
    }
    else {
      return this.readOnlyTemplate;
    }
  }

  saveCategory(){
    if(this.isNewRecord){

      this.categoryService.createCategory(this.editedCategory).subscribe((category: CategoryServerResponse) =>{
        this.statusMessage = "Категорія успішно додана", this.loadCategories()
        this.flashMessage.show(this.statusMessage, { cssClass: 'alert-success', timeout: 2000 });

      });

      this.isNewRecord = false;
      this.editedCategory = null;

    }
    else {

      this.categoryService.updateCategory(this.editedCategory.id,this.editedCategory).subscribe((category: CategoryServerResponse) => {
        this.statusMessage = "Категорію успішно оновлено", this.loadCategories()
        this.flashMessage.show(this.statusMessage, { cssClass: 'alert-success', timeout: 2000 });

      });

      this.editedCategory = null;
    }
  }

  cancel() {
    if(this.isNewRecord){
      this.categories.pop();
      this.isNewRecord = false;
    }
    this.editedCategory = null;
  }

  deleteCategory(category: Category) {
    this.categoryService.deleteCategory(category.id).subscribe((category: CategoryServerResponse) => {
      this.statusMessage = "Категорію успішно видалено", this.loadCategories();
      this.flashMessage.show(this.statusMessage, { cssClass: 'alert-success', timeout: 2000 });

    });
  }

}
