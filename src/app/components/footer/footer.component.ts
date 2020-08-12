import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NewsService} from "../../services/news.service";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(4)]),
  });
  email: string;

  constructor(public  translate: TranslateService, private newsService: NewsService,private flashMessage: FlashMessagesService) { }

  ngOnInit(): void {
  }

  get f() {
    return this.form.controls;
  }

  chooseLang(lang: string){
    this.translate.use(lang)
    localStorage.setItem('language', lang);
    window.location.reload();
  }
  submit() {

    this.newsService.sendEmail(this.email).subscribe(news => {
      news.email = this.email;
    });

    this.form.reset();
    this.flashMessage.show("You have successfully subscribed", { cssClass: 'alert-success', timeout: 2000 });


  }


}
