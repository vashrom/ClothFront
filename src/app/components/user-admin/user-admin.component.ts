import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {User, UserModelServer, UserServerResponse} from "../../models/user.model";
import {FlashMessagesService} from "angular2-flash-messages";
import {UserService} from "../../services/user.service";
import {ServerResponse} from "../../models/blog.model";

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.css']
})
export class UserAdminComponent implements OnInit {

  @ViewChild('readOnlyTemplate', {static: false}) readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate', {static: false}) editTemplate: TemplateRef<any>;

  editedUser: User;
  users: UserModelServer[] = [];
  isNewRecord: boolean;
  statusMessage: string;

  constructor(private userService: UserService,private flashMessage: FlashMessagesService) {
    this.users = new Array<User>();

  }

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers() {
    this.userService.getAllUsers().subscribe((users: UserServerResponse) => {
      this.users = users.users.reverse();
    });
  }

  editUser(user: User) {
    this.editedUser = new User(user.id,user.password,user.email,user.first_name,user.last_name,user.role,user.created, user.phone);
  }

  loadTemplate(user: User){
    if(this.editedUser && this.editedUser.id === user.id){
      return this.editTemplate;
    }
    else {
      return this.readOnlyTemplate;
    }
  }

  saveUser(){

      this.userService.updateUser(this.editedUser.id,this.editedUser).subscribe((user: UserServerResponse) => {
        this.statusMessage = "Користвача успішно оновлено", this.loadUsers()
        this.flashMessage.show(this.statusMessage, { cssClass: 'alert-success', timeout: 2000 });

      });

      this.editedUser = null;
  }

  cancel() {
    if(this.isNewRecord){
      this.users.pop();
      this.isNewRecord = false;
    }
    this.editedUser = null;
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user.id).subscribe((users: UserServerResponse) => {
      this.statusMessage = "Користувача успішно видалено", this.loadUsers();
      this.flashMessage.show(this.statusMessage, { cssClass: 'alert-success', timeout: 2000 });

    });
  }

}
