import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { faFileCode, faCloudUploadAlt, faFont, faSearch, faImages } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/services/api.service';

import elementsData from 'src/app/data/elements.json';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../shared/modal/modal.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-create-sidebar',
  templateUrl: './create-sidebar.component.html',
  styleUrls: ['./create-sidebar.component.scss']
})

export class CreateSidebarComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();

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

  totalPage : number = 1; 
  currentPage: number = 1;

  @Output() element: EventEmitter<any> = new EventEmitter();
  @Output() preloader: EventEmitter<any> = new EventEmitter();
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
    this.totalPage = 1;
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
    this.apiService.getApi('app/templates').pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      this.currentElementList = res.body; 
      
      // this.rejectedTotalPage = res.headers.get('x-pagination-page-count');
      //   this.rejectedList = res.body;
      //   this.rejectedListDisplay = this.rejectedList.length ? true : false;
      //   this.preloaderStatus = false;

    });
  }

  getUploadedImageList() {
    this.apiService.getApi('me/images').subscribe(res => {
      this.currentElementList = res.body; 
      console.log(this.currentElementList);
    });
  }

  getImages() {
    this.preloader.emit(true);
    this.apiService.getApi('app/images?category='+this.selectedCategory+'&page=' + this.currentPage).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      this.currentElementList = res.body; 
      this.totalPage = res.headers.get('x-pagination-page-count');
      console.log(res.headers.get('x-pagination-page-count'));
      this.preloader.emit(false);
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

  pagination(value : any) {
    if(this.currentTab === 'elements') {
      this.currentTab = value;
      this.getImages();
    } else if (this.currentTab === 'template') {
      this.currentTab = value;
      this.getTemplateList();
    } else if (this.currentTab === 'upload') {
      this.currentTab = value;
      this.getUploadedImageList();
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
