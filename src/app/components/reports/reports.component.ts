import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  currentContent = 'datatable';

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  getContent(page: string) {
    this.currentContent = page
  }

}
