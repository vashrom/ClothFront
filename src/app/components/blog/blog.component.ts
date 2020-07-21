import { Component, OnInit } from '@angular/core';
import {BlogModelServer} from "../../models/blog.model";
import {Router} from "@angular/router";
import {BlogService} from "../../services/blog.service";
import {ServerResponse} from "../../models/blog.model";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  blog: BlogModelServer[] = [];

  constructor(private blogService: BlogService, private router: Router) { }

  ngOnInit(): void {

    this.blogService.getAllBlogItems().subscribe((bl: ServerResponse) => {
      this.blog = bl.blog;
      console.log(this.blog);
    });


  }

  selectItem(id: number) {
    this.router.navigate(['/blog',id]).then();
  }
}
