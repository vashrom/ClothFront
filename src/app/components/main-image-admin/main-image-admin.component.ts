import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {environment} from "../../../environments/environment";
import {Image, ImageModelServer, ImageServerResponse} from "../../models/image.model";
import {FlashMessagesService} from "angular2-flash-messages";
import {HttpClient} from "@angular/common/http";
import {ImageService} from "../../services/image.service";

@Component({
  selector: 'app-main-image-admin',
  templateUrl: './main-image-admin.component.html',
  styleUrls: ['./main-image-admin.component.css']
})
export class MainImageAdminComponent implements OnInit {

  @ViewChild('readOnlyTemplate', {static: false}) readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate', {static: false}) editTemplate: TemplateRef<any>;

  editedImages: Image;
  images: ImageModelServer[] = [];
  isNewRecord: boolean;
  statusMessage: string;

  constructor(private imageService: ImageService, private flashMessage: FlashMessagesService,private http: HttpClient) {
    this.images = new Array<Image>()
  }

  ngOnInit(): void {
    this.loadImages()
  }


  loadImages()
  {
    this.imageService.getAllImages().subscribe((images: ImageServerResponse) => {
      this.images = images.images;
    });
  }

  editImages(image: Image) {
    this.editedImages = new Image(image.id,image.slider1_1,image.slider1_2,image.slider2_1,image.slider2_2,image.slider3_1,image.slider3_2,image.cat_1,image.cat_2,image.cat_3);
  }

  loadTemplate(image: Image){
    if(this.editedImages && this.editedImages.id === image.id){
      return this.editTemplate;
    }
    else {
      return this.readOnlyTemplate;
    }
  }

  saveImage(){


      this.imageService.updateImages(this.editedImages.id,this.editedImages).subscribe((images: ImageServerResponse) => {
        this.statusMessage = "Зображення успішно оновлено", this.loadImages()
        this.flashMessage.show(this.statusMessage, { cssClass: 'alert-success', timeout: 2000 });

      });

      this.editedImages = null;

  }

  cancel() {
    if(this.isNewRecord){
      this.images.pop();
      this.isNewRecord = false;
    }
    this.editedImages = null;
  }

}
