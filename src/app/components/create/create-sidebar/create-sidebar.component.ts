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
  selectedImage: any;

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
      this.getImages();
    } else if (selected === 'template') {
      this.getTemplateList();
    } else if (selected === 'upload') {
      this.getUploadedImageList();
    }
  }

  selectCategory(key:string) {
    this.currentElementList = this.elements[key];
    this.folderName = key.replace(/\s/g, "");
  }

  getTemplateList() {
    this.apiService.getApi('me/projects').subscribe(res => {
      this.currentElementList = res; 
    });
  }

  getUploadedImageList() {
    this.apiService.getApi('me/images').subscribe(res => {
      this.currentElementList = res; 
    });
  }

  getImages() {
    let results;
    this.apiService.getApi('me/images').subscribe(res => {
      this.currentElementList = res; 
    });
  }

  addElement(type: string, data: any) {
    data.type = type;
    this.element.emit(data);
  }

  selectImage(imageDetails: any) {
    this.selectedImage = imageDetails.target.files[0];
    this.selectedFileName = imageDetails.target.files[0].name;
    this.enableUploadBtn = true;
  }

  uploadImage() {
    const fd = new FormData();
    fd.append('file_upload', this.selectedImage, this.selectedFileName);
    fd.append('title', this.selectedFileName);
    console.log(fd);
    this.apiService.postApi('me/images', fd).subscribe(res=> {
      console.log(res);
      alert('uploaded!')
    });
  }

}
