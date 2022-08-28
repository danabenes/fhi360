import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() currentPage: number = 1;
  @Input() totalPage: any;
  @Output() newPage = new EventEmitter();

  faArrowLeft = faCaretLeft;
  faArrowRight = faCaretRight;

  constructor() { }

  ngOnInit(): void {
  }

  handlePagination(action: string) {
    if(action === 'next') {
      if(this.currentPage !== parseInt(this.totalPage)) {
        this.currentPage +=1;
        this.newPage.emit(this.currentPage);
      } 
    } else {
      if(this.currentPage !== 1) {
        this.newPage.emit(this.currentPage -= 1);
      }
    }
  }

}
