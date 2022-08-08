import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faFileCode, faCloudUploadAlt, faFont, faSearch, faImages } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/services/api.service';

import elementsData from 'src/app/data/elements.json';

@Component({
  selector: 'app-create-sidebar',
  templateUrl: './create-sidebar.component.html',
  styleUrls: ['./create-sidebar.component.scss']
})

export class CreateSidebarComponent implements OnInit {

  faFileCode = faFileCode;
  faCloudUploadAlt = faCloudUploadAlt;
  faFont = faFont;
  faSearch = faSearch;
  faImages = faImages;
  currentTab : string = 'elements';
  currentElementList: any = [];

  selectedFileName: string = 'Select Image';
  enableUploadBtn: boolean = false;
  selectedCategory: string = "background";
  folderName: string = "background";

  @Output() element: EventEmitter<any> = new EventEmitter();
  elements: any;


  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.elements = elementsData;
    this.showList(this.currentTab);
  }

  showList(selected: string) {
    this.currentTab = selected;
    if(selected === 'elements') {
      this.currentElementList = this.elements['background'];
    } 
  }

  selectCategory(key:string) {
    this.currentElementList = this.elements[key];
    this.folderName = key.replace(/\s/g, "");
  }

  getImages() {
    let results;
    this.apiService.getApi('images').subscribe(res => {
      this.currentElementList = res; 
    });

    return results;
  }

  addElement(type: string, data: any) {
    data.type = type;
    this.element.emit(data);
  }

  selectImage(imageDetails: any) {
    this.selectedFileName = imageDetails.target.files[0].name;
    this.enableUploadBtn = true;
  }

  uploadImage() {
    console.log('upload image');
  }

}
