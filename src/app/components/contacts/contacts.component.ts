import {Component, OnInit, ViewChild} from '@angular/core';
import {} from 'googlemaps';
import {CommentServerResponse} from "../../models/comment.model";
import {Router} from "@angular/router";
import {CommentService} from "../../services/comment.service";
import {CommentModelServer} from "../../models/comment.model";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(4)]),
    text: new FormControl('', Validators.required)
  });
  name: string;
  email: string;
  text: string;

  constructor(private commentService: CommentService, private router: Router,private flashMessage: FlashMessagesService) {
  }

  ngOnInit(): void {


  }

  get f() {
    return this.form.controls;
  }

  submit() {

    this.commentService.postComment(this.name, this.email, this.text, 1).subscribe(comm => {
      comm.name = this.name;
      comm.email = this.email;
      comm.text = this.text;
      comm.cat_id = 1;
    });

    this.form.reset();
    this.flashMessage.show("Message succesfully sended", { cssClass: 'alert-success', timeout: 2000 });

  }

}
// @ViewChild('map',{static:true}) mapElement: any;
// map: google.maps.Map;
// marker: google.maps.Marker;

// const mapProperties = {
//   center: new google.maps.LatLng(49.048938, 23.770880),
//   zoom: 15,
//   mapTypeId: google.maps.MapTypeId.ROADMAP,
// };
// this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
// this.marker = new google.maps.Marker({
//   position: new google.maps.LatLng(49.048938, 23.770880),
//   title: 'Developers'
// });
// this.marker.setMap(this.map);
