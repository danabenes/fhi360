import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faHome, faFile, faFileCode, faChartLine } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  faHome = faHome;
  faFile = faFile;
  faFileCode = faFileCode;
  faChartLine = faChartLine;
  currentPage: string = '';

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentPage = this.router.url.split('/')[1];
  }

}
