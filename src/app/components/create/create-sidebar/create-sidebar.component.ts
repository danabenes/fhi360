import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { faFileCode, faCloudUploadAlt, faFont, faSearch, faImages } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/services/api.service';

import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../shared/modal/modal.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Router } from '@angular/router';

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

  elementsCategory = [
    {
      id: 'background',
      name: 'background'
    }, {
      id: 'bacteria',
      name: 'bacteria'
    },{
      id: 'bodyparts',
      name: 'body parts'
    },{
      id: 'calltoaction',
      name: 'call to action'
    },{
      id: 'food',
      name: 'food'
    },{
      id: 'logo',
      name: 'logo'
    },{
      id: 'meds',
      name: 'medicine'
    },{
      id: 'others',
      name: 'others'
    },{
      id: 'people',
      name: 'people'
    },{
      id: 'people2',
      name: 'people 2'
    },{
      id: 'people3',
      name: 'people 3'
    },{
      id: 'shapes',
      name: 'shapes'
    },{
      id: 'tech',
      name: 'technology'
    }
  ];

  selectedFileName: string = 'Select Image';
  selectedImage: any;

  enableUploadBtn: boolean = false;
  maxSize: boolean = false;
  selectedCategory: string = "background";

  totalPage : number = 1; 
  currentPage: number = 1;

  @Output() element: EventEmitter<any> = new EventEmitter();
  @Output() preloader: EventEmitter<any> = new EventEmitter();

  @ViewChild('fileInput')fileInput!: ElementRef;

  elements: any;


  constructor(
    private apiService: ApiService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
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
    this.currentElementList = key;
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
      console.log(res);
      let imageList = res.body;
      this.currentElementList = imageList; 
      this.totalPage = res.headers.get('x-pagination-page-count');
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
    // Validate image size
    const fileSize = this.fileInput.nativeElement.size;
    const fileMb = fileSize / 1024 ** 2;

    if(fileMb >= 2) {
      this.maxSize = !this.maxSize;
    }

    console.log(fileMb);

    // const fd = new FormData();
    // fd.append('file_upload', this.selectedImage, this.selectedFileName);
    // fd.append('title', this.selectedFileName);
    // this.apiService.postApi('me/images', fd).subscribe(res=> {
    //   const details = {
    //     type: 'prompt',
    //     message: 'Image Uploaded!'
    //   }
  
    //   this.dialog.open(ModalComponent, {
    //     width: '500px',
    //     data: {
    //       details: details,
    //       actions: []
    //     }
    //   });
    // });
  }

  pagination(value : any) {
    if(this.currentTab === 'elements') {
      this.currentPage = value;
      this.getImages();
    } else if (this.currentTab === 'template') {
      this.currentPage = value;
      this.getTemplateList();
    } else if (this.currentTab === 'upload') {
      this.currentPage = value;
      this.getUploadedImageList();
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
