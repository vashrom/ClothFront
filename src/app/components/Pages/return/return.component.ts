import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CommentService} from "../../../services/comment.service";
import {Router} from "@angular/router";
import {ProductService} from "../../../services/product.service";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.css']
})
export class ReturnComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(4)]),
    text: new FormControl('', Validators.required)
  });
  name: string;
  email: string;
  text: string;

  constructor(private commentService: CommentService,private router: Router,private flashMessage: FlashMessagesService) { }

  ngOnInit(): void {
  }

  get f() {
    return this.form.controls;
  }

  submit() {

    this.commentService.postComment(this.name, this.email, this.text, 2).subscribe(comm => {
      comm.name = this.name;
      comm.email = this.email;
      comm.text = this.text;
      comm.cat_id = 2;

    });

    this.form.reset();
    this.flashMessage.show("Message succesfully sended", { cssClass: 'alert-success', timeout: 2000 });


  }

}
