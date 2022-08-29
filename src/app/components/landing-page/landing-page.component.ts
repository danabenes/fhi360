import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { ModalComponent } from '../shared/modal/modal.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit, AfterViewInit {

  templateList: any;
  designList: any;

  templateCurrentPage: number = 1;
  templateTotalPage: number = 1;
  designCurrentPage: number = 1;
  designTotalPage: number = 1;

  designDisplay: boolean = false;
  templateDisplay: boolean = true;


  constructor(
    public dialog: MatDialog,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.getRecentDesigns();
    this.getRecentTemplates();
  }

  getRecentDesigns() {
    this.apiService.getApi('me/projects?page='+this.designCurrentPage).subscribe(res => {
      if(res.status === 200) {
        this.designTotalPage = res.headers.get('x-pagination-page-count');
        this.designList = res.body;
        this.designDisplay = this.designList.length ? true : false;
      }
    });
  }

  getRecentTemplates() {
    this.apiService.getApi('app/templates').subscribe(res => {
      if(res.status === 200) {
        this.templateTotalPage = res.headers.get('x-pagination-page-count');
        this.templateList = res.body;
        this.templateDisplay = this.templateList.length ? true: false;
      }
    });
  }

  handleRecentDesign(details: any, type: string) {
    details.type = type;
    this.dialog.open(ModalComponent, {
      width: '700px',
      data: {
        details: details,
        actions: [{
          id: 'edt',
          label: 'Edit'
        }, {
          id: 'cpy',
          label: 'Make a copy'
        }, {
          id: 'shr',
          label: 'Share this design'
        }]
      }
    });
  }

  pagination(section: string, value: any) {
    if(section === 'design') {
      this.designCurrentPage = value;
      this.getRecentDesigns();
    } else {
      this.templateCurrentPage = value;
      this.getRecentTemplates();
    }
  }

}
