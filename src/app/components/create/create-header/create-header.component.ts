import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faAngleLeft, faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-header',
  templateUrl: './create-header.component.html',
  styleUrls: ['./create-header.component.scss']
})
export class CreateHeaderComponent implements OnInit {

  faAngleLeft = faAngleLeft;
  faPen = faPen;

  @Output() share: EventEmitter<any> = new EventEmitter();
  @Output() download: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  saveAsImage() {
    this.share.emit();
  }

  downloadDesign() {
    this.download.emit();
  }

}
