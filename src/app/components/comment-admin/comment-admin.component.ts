import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CommentService} from "../../services/comment.service";
import {Comment, CommentModelServer, CommentServerResponse} from "../../models/comment.model";
import {FlashMessagesService} from "angular2-flash-messages";


@Component({
  selector: 'app-comment-admin',
  templateUrl: './comment-admin.component.html',
  styleUrls: ['./comment-admin.component.css']
})
export class CommentAdminComponent implements OnInit {

  @ViewChild('readOnlyTemplate', {static: false}) readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate', {static: false}) editTemplate: TemplateRef<any>;

  comments: CommentModelServer[] = [];
  statusMessage: string;
  catName: string;

  constructor(private commentService: CommentService,private flashMessage: FlashMessagesService) {
    this.comments = new Array<Comment>();

  }


  ngOnInit(): void {
    this.loadComments();

  }



 loadComments() {
    this.commentService.getAllComments().subscribe((comm: CommentServerResponse) => {
      this.comments = comm.comments.reverse();
    });
  }

  loadContact() {
    this.loadCommentsByCategory("contact")
  }
  loadReturn() {
    this.loadCommentsByCategory("return")
  }

  loadCommentsByCategory(category: string){
    this.commentService.getCommentsFromCategory(category).subscribe(comm => {
      this.comments = comm;

    });
  }



  deleteProduct(comm: Comment) {
    this.commentService.deleteComment(comm.id).subscribe((comm: CommentServerResponse) => {
      this.statusMessage = "Коментар успішно видалено", this.loadComments();
      this.flashMessage.show(this.statusMessage, { cssClass: 'alert-success', timeout: 2000 });

    });

  }


}
