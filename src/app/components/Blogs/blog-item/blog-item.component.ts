import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {BlogService} from "../../../services/blog.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-blog-item',
  templateUrl: './blog-item.component.html',
  styleUrls: ['./blog-item.component.css']
})
export class BlogItemComponent implements OnInit {

  id: number;
  blog;
  thumbImages: any[] = [];

  constructor(private blogService: BlogService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((param: ParamMap) => {
        // @ts-ignore
        return param.params.id;
      })
    ).subscribe(blogId => {
      this.id = blogId;
      this.blogService.getSingleBlogItem(this.id).subscribe(bl => {
        this.blog = bl;
        if (bl.images !== null) {
          this.thumbImages = bl.images.split(';');
        }
        console.log(this.blog)
      });
    });
  }

}
