import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faFileCode, faCloudUploadAlt, faFont, faSearch, faImages } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/services/api.service';

import elementsData from 'src/app/data/elements.json';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../shared/modal/modal.component';

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
  currentTab : string = 'template';
  currentElementList: any = [];

  selectedFileName: string = 'Select Image';
  selectedImage: any;

  enableUploadBtn: boolean = false;
  selectedCategory: string = "background";

  @Output() element: EventEmitter<any> = new EventEmitter();
  elements: any;


  constructor(
    private apiService: ApiService,
    public dialog: MatDialog
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
    this.selectedCategory = key;
    this.getImages();
  }

  getTemplateList() {
    this.apiService.getApi('me/projects').subscribe(res => {
      console.log(res);
      this.currentElementList = res.body; 
    });
  }

  getUploadedImageList() {
    this.apiService.getApi('me/images').subscribe(res => {
      this.currentElementList = res.body; 
    });
  }

  getImages() {
    this.apiService.getApi('me/images?category='+this.selectedCategory).subscribe(res => {
      this.currentElementList = res.body; 
    });
  }

  addElement(type: string, data: any) {
    console.log(data);
    data.type = type;
    this.element.emit(data);
  }

  selectImage(imageDetails: any) {
    console.log(imageDetails);
    this.selectedImage = imageDetails.target.files[0];
    this.selectedFileName = imageDetails.target.files[0].name;
    this.enableUploadBtn = true;
  }

  uploadImage() {
    const fd = new FormData();
    fd.append('file_upload', this.selectedImage, this.selectedFileName);
    fd.append('title', this.selectedFileName);
    this.apiService.postApi('me/images', fd).subscribe(res=> {
      const details = {
        type: 'prompt',
        message: 'Image Uploaded!'
      }
  
      this.dialog.open(ModalComponent, {
        width: '500px',
        data: {
          details: details,
          actions: []
        }
      });
    });
  }

}
