import { Component, ElementRef, OnInit, QueryList, ViewChild } from '@angular/core';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import domtoimage from 'dom-to-image';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../shared/modal/modal.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  @ViewChild('canvas')canvas!: ElementRef;
  @ViewChild('screen')screen!: ElementRef;
  @ViewChild('richText')richText!: ElementRef;

  faDrag = faLocationArrow;
  arrayOfElements: Array<any> = [];
  selectedElement: any;

  // array of template elements
  templateElements: Array<any> = [];

  bgSelected : boolean = false;
  currentIndex:any = null;
  backgroundColor: string = 'white';
  elementFillColor: string = 'black';
  defaultFontSize : number = 12;
  defaultPosition: number = 0;
  appendHtml: any;
  isTemplate: boolean = false;
  templateFileName: string = 'UntitledDesign';

  constructor(
    private apiService: ApiService,
    public dialog: MatDialog
  ) { 
  }

  ngOnInit(): void {
    this.arrayOfElements.push({type: 'background', bg: 'white'});

    const details = {
      type: 'prompt',
      message: 'Design is submitted for review.'
    }

    this.dialog.open(ModalComponent, {
      width: '500px',
      data: {
        details: details,
        actions: [
          {
            id: 'ok',
            label: 'Ok',
            color: 'white',
            background: '#36a592'
          }
        ]
      }
    });
  }

  clickedOutside(element:any) {
    if(element.target === element.currentTarget) {
      this.bgSelected = false;
      this.currentIndex = null;
    }
  }

  selectBgArea(element: any) {
    if(element.target === element.currentTarget) {
      this.bgSelected = true;
      this.currentIndex = 0;
    }
  }

  addElement(data: any) {
    if(data.type === 'template') {
      this.arrayOfElements = [];
      this.createTemplate(data.content);
    } else {
      let indexOfLatestElem = this.arrayOfElements.push(data) - 1;
      this.currentIndex = indexOfLatestElem;
      this.defaultFontSize = data.fontSize ? data.fontSize.substring(0,2) : 12;
    }
  }

  createTemplate(elements: any) {
    for (let index = 0; index < elements.length; index++) {
      this.arrayOfElements.push(elements[index]);
    }

    this.backgroundColor = this.arrayOfElements[0].bg ? this.arrayOfElements[0].bg : 'white';
  }

  selectElement(index: number) {
    this.currentIndex = index;

    // set size
    const element = document.getElementById('elementImageWrapper'+index);
    const text = document.getElementById('textWrapper'+index);
    if(this.arrayOfElements[index].type === 'element') {
      this.arrayOfElements[index].width = element?.style.width;
      this.arrayOfElements[index].height = element?.style.height;
    } else {
      this.arrayOfElements[index].width = text?.style.width;
      this.arrayOfElements[index].height = text?.style.height;
    }
  }
  

  setPosition(i: number) {
    const element = document.getElementById('elementWrapper'+i);
    this.arrayOfElements[i].position = element?.style.transform;
  }

  getTextValue(e: any) {
    this.arrayOfElements[this.currentIndex].textValue = e.target.value;
  }

  setElementStyle(styles: any) {
    if(this.arrayOfElements[this.currentIndex].hasOwnProperty(styles.key) && this.arrayOfElements[this.currentIndex][styles.key] === styles.value && styles.key !== 'z-index') {
      delete this.arrayOfElements[this.currentIndex][styles.key];
    } else {
      this.arrayOfElements[this.currentIndex][styles.key] = styles.value;
    }

    if(styles.key === 'bg' && this.currentIndex === 0) {
      this.backgroundColor = styles.value;
    }

    if(styles.key === 'z-index') {
      switch(styles.value) {
        case 'back':
          this.arrayOfElements[this.currentIndex][styles.key] = this.defaultPosition - 1
        break;
        case 'base':
          this.arrayOfElements[this.currentIndex][styles.key] = -999;
        break;
        case 'forward':
          this.arrayOfElements[this.currentIndex][styles.key] = this.defaultPosition + 1;
        break;
        case 'front':
          this.arrayOfElements[this.currentIndex][styles.key] = 999;
        break;
        default:
          this.arrayOfElements[this.currentIndex][styles.key] = 0;
      }
    }
  }

  deleteItem() {
    this.arrayOfElements.forEach((value,index)=>{
      if(index==this.currentIndex) this.arrayOfElements.splice(index,1);
    });
  }

  getFileName(name: any) {
    this.templateFileName = name;
  }

  shareTemplate() {
    domtoimage.toPng(this.canvas.nativeElement, {quality: 0.99})
    .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'template.png';
        link.href = dataUrl;
        link.click();
    });
  }

  downloadDesign() {
    let thumbnailImg: any;
    
    domtoimage.toPng(this.canvas.nativeElement)
    .then( async (dataUrl) => {
        thumbnailImg = new Image();
        thumbnailImg.src = dataUrl;

        let designData: Object = {
          title: this.templateFileName,
          content: this.arrayOfElements,
          file_upload: new File([thumbnailImg], this.templateFileName+'.png', {type: 'image/jpeg'})
        };

        const details = {
          type: 'option',
          message: 'Are you done with branding?',
          subtext: 'Make sure to include all necessary logos on your design'
        }
    
        let dialogRef = this.dialog.open(ModalComponent, {
          width: '700px',
          data: {
            details: details,
            actions: [
              {
                id: 'yes',
                label: 'Yes,',
                sublabel: ' Action',
                color: 'white',
                background: '#36a592'
              }, {
                id: 'no',
                label: 'No',
                color: 'black',
                background: '#ffd1d1'
              }
            ]
          }
        });
    
        dialogRef.afterClosed().subscribe( result => {
          if(result === 'yes') {
            this.submitDesign(designData);
          }
        });
    });
  }

  submitDesign(data: any) {
    this.apiService.postApi('me/projects', data).subscribe(res => {
      const details = {
        type: 'prompt',
        message: 'Design is submitted for review.'
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
