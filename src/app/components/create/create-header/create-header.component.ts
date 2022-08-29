import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { faAngleLeft, faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-header',
  templateUrl: './create-header.component.html',
  styleUrls: ['./create-header.component.scss']
})
export class CreateHeaderComponent implements OnInit {

  faAngleLeft = faAngleLeft;
  faPen = faPen;
  setFileName: boolean = false;

  templateForm: any ;
  templateFileName:string = "Untitled Design";

  @Output() share: EventEmitter<any> = new EventEmitter();
  @Output() download: EventEmitter<any> = new EventEmitter();
  @Output() fileName: EventEmitter<any> = new EventEmitter();
  @Output() create: EventEmitter<any> = new EventEmitter();

  constructor(
    public formBuilder: FormBuilder
  ) {
    this.templateForm = this.formBuilder.group({
      templateName: ''
    });
  }

  ngOnInit(): void {
  }

  saveAsImage() {
    this.share.emit();
  }

  createNewDesign() {
    this.create.emit();
  }

  downloadDesign() {
    this.download.emit();
  }

  setTemplateFileName(e:any) {
    e.stopPropagation();
    this.setFileName = !this.setFileName;
    if(!this.setFileName) {
      this.templateFileName = this.templateForm.value.templateName ?  this.templateForm.value.templateName  : "Untitled Design" ;
    }
    this.fileName.emit(this.templateFileName);
  }

}
