import { Component, OnInit } from '@angular/core';
import {News, NewsModelServer, NewsServerResponse} from "../../../models/news.model";
import {FlashMessagesService} from "angular2-flash-messages";
import {NewsService} from "../../../services/news.service";
import {User, UserServerResponse} from "../../../models/user.model";

@Component({
  selector: 'app-news-admin',
  templateUrl: './news-admin.component.html',
  styleUrls: ['./news-admin.component.css']
})
export class NewsAdminComponent implements OnInit {

  emails: NewsModelServer[] = [];
  statusMessage: string;

  constructor(private newsService: NewsService,private flashMessage: FlashMessagesService) {
    this.emails = new Array<News>()
  }

  private loadNews() {
    this.newsService.getAllEmails().subscribe((news: NewsServerResponse) => {
      this.emails = news.news.reverse();
    });
  }


  ngOnInit(): void {
    this.loadNews()
  }




  deleteEmail(email: News) {
    this.newsService.deleteEmail(email.id).subscribe((users: NewsServerResponse) => {
      this.statusMessage = "Підписника успішно видалено", this.loadNews();
      this.flashMessage.show(this.statusMessage, { cssClass: 'alert-success', timeout: 2000 });

    });
  }

}
