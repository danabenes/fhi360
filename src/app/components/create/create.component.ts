import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import domtoimage from 'dom-to-image';
import { ApiService } from 'src/app/services/api.service';

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

  bgSelected : boolean = false;
  currentIndex:any = null;
  backgroundColor: string = 'white';
  elementFillColor: string = 'black';
  defaultFontSize : number = 12;
  defaultPosition: number = 0;
  appendHtml: any;
  isTemplate: boolean = false;

  constructor(
    private apiService: ApiService
  ) { 
  }

  ngOnInit(): void {
    this.arrayOfElements.push({type: 'background', color: 'white'});
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
      this.isTemplate = true;
      this.appendHtml = data.content;
    } else {
      let indexOfLatestElem = this.arrayOfElements.push(data) - 1;
      this.currentIndex = indexOfLatestElem;
      this.defaultFontSize = data.fontSize ? data.fontSize.substring(0,2) : 12;
    }
  }

  selectElement(index: number) {
    this.currentIndex = index;
  }

  setElementStyle(styles: any) {
    console.log(styles);
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
    const element = this.canvas.nativeElement;
    const elementHtml = element.outerHTML;
    let designData = {
      title: "Template 1",
      content: elementHtml
    }
    this.apiService.postApi('me/projects', designData).subscribe(res => {
      alert('submitted');
    })
  }

}
