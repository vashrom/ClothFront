import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Blog, BlogModelServer, BlogServerResponse} from "../../models/blog.model";
import {BlogService} from "../../services/blog.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-blog-admin',
  templateUrl: './blog-admin.component.html',
  styleUrls: ['./blog-admin.component.css']
})
export class BlogAdminComponent implements OnInit {

  @ViewChild('readOnlyTemplate', {static: false}) readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate', {static: false}) editTemplate: TemplateRef<any>;

  editedBlog: Blog;
  blogs: BlogModelServer[] = [];
  isNewRecord: boolean;
  statusMessage: string;
  private SERVER_URL = environment.SERVER_URL;

  constructor(private blogService: BlogService,private flashMessage: FlashMessagesService,private http: HttpClient) {
    this.blogs = new Array<Blog>();
  }

  ngOnInit(): void {
    this.loadBlogs();
  }


  private loadBlogs() {
    return this.http.get<BlogServerResponse>(this.SERVER_URL + '/blog/en', {}).subscribe((blog: BlogServerResponse) => {
      this.blogs = blog.blog.reverse();
    });
  }
  addBlog(){
    this.editedBlog = new Blog(0,"","","","","","","","","","","","","","","");
    this.blogs.push(this.editedBlog);
    this.isNewRecord = true;
  }

  editBlog(blog: Blog) {
    this.editedBlog = new Blog(blog.id,blog.title,blog.title_ua,blog.title_ru,blog.title_de,blog.image,blog.images,blog.text,blog.text_ua,blog.text_ru,blog.text_de,blog.category,blog.category_ua,blog.category_ru,blog.category_de, blog.date);
  }

  loadTemplate(blog: Blog){
    if(this.editedBlog && this.editedBlog.id === blog.id){
      return this.editTemplate;
    }
    else {
      return this.readOnlyTemplate;
    }
  }

  saveProduct(){
    if(this.isNewRecord){

      this.blogService.createBlog(this.editedBlog).subscribe((blog: BlogServerResponse) =>{
        this.statusMessage = "Запис блогу успішно додано", this.loadBlogs()
        this.flashMessage.show(this.statusMessage, { cssClass: 'alert-success', timeout: 2000 });

      });

      this.isNewRecord = false;
      this.editedBlog = null;

    }
    else {

      this.blogService.updateBlog(this.editedBlog.id,this.editedBlog).subscribe((blog: BlogServerResponse) => {
        this.statusMessage = "Запис блогу успішно оновлено", this.loadBlogs()
        this.flashMessage.show(this.statusMessage, { cssClass: 'alert-success', timeout: 2000 });

      });

      this.editedBlog = null;
    }
  }

  cancel() {
    if(this.isNewRecord){
      this.blogs.pop();
      this.isNewRecord = false;
    }
    this.editedBlog = null;
  }

  deleteBlog(blog: Blog) {
    this.blogService.deleteBlog(blog.id).subscribe((blog: BlogServerResponse) => {
      this.statusMessage = "Запис блогу успішно видалено", this.loadBlogs();
      this.flashMessage.show(this.statusMessage, { cssClass: 'alert-success', timeout: 2000 });

    });
  }

}
