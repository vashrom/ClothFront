import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Collection, CollectionModelServer, CollectionServerResponse} from "../../../models/collection.model";
import {FlashMessagesService} from "angular2-flash-messages";
import {HttpClient} from "@angular/common/http";
import {CollectionService} from "../../../services/collection.service";

@Component({
  selector: 'app-collection-admin',
  templateUrl: './collection-admin.component.html',
  styleUrls: ['./collection-admin.component.css']
})
export class CollectionAdminComponent implements OnInit {

  @ViewChild('readOnlyTemplate', {static: false}) readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate', {static: false}) editTemplate: TemplateRef<any>;

  editedCollection: Collection;
  collections: CollectionModelServer[] = [];
  isNewRecord: boolean;
  statusMessage: string;
  private SERVER_URL = environment.SERVER_URL;

  constructor(private collectionService: CollectionService,private flashMessage: FlashMessagesService,private http: HttpClient) {
    this.collections = new Array<Collection>();

  }

  ngOnInit(): void {
    this.loadCollections();
  }

  private loadCollections() {
    return this.http.get<CollectionServerResponse>(this.SERVER_URL + '/collection', {}).subscribe((collection: CollectionServerResponse) => {
      this.collections = collection.collection.reverse();
    });
  }

  addCollection(){
    this.editedCollection = new Collection(0,"","","","","");
    this.collections.push(this.editedCollection);
    this.isNewRecord = true;
  }

  editCollection(collection: Collection) {
    this.editedCollection = new Collection(collection.id,collection.title,collection.title_ua,collection.title_ru,collection.title_de, collection.title_en);
  }

  loadTemplate(collection: Collection){
    if(this.editedCollection && this.editedCollection.id === collection.id){
      return this.editTemplate;
    }
    else {
      return this.readOnlyTemplate;
    }
  }
  saveCollection(){
    if(this.isNewRecord){

      this.collectionService.createCollection(this.editedCollection).subscribe((collection: CollectionServerResponse) =>{
        this.statusMessage = "Колекція успішно додана", this.loadCollections()
        this.flashMessage.show(this.statusMessage, { cssClass: 'alert-success', timeout: 2000 });

      });

      this.isNewRecord = false;
      this.editedCollection = null;

    }
    else {

      this.collectionService.updateCollection(this.editedCollection.id,this.editedCollection).subscribe((collection: CollectionServerResponse) => {
        this.statusMessage = "Колекцію успішно оновлено", this.loadCollections()
        this.flashMessage.show(this.statusMessage, { cssClass: 'alert-success', timeout: 2000 });

      });

      this.editedCollection = null;
    }
  }

  cancel() {
    if(this.isNewRecord){
      this.collections.pop();
      this.isNewRecord = false;
    }
    this.editedCollection = null;
  }

  deleteCollection(collection: Collection) {
    this.collectionService.deleteCollection(collection.id).subscribe((collection: CollectionServerResponse) => {
      this.statusMessage = "Колекцію успішно видалено", this.loadCollections();
      this.flashMessage.show(this.statusMessage, { cssClass: 'alert-success', timeout: 2000 });

    });
  }






}


