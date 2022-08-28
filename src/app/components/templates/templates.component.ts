import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { ModalComponent } from '../shared/modal/modal.component';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {

  templateList: any;

  templateCurrentPage: number = 1;
  templateTotalPage: number = 1;

  templateDisplay: boolean = false;

  constructor(
    public dialog: MatDialog,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getTemplateList();
  }

  getTemplateList() {
    this.apiService.getApi('app/templates?page='+this.templateCurrentPage).subscribe(res => {
      if(res.status == 200) {
        this.templateTotalPage = res.headers.get('x-pagination-page-count');
        this.templateList = res.body;
        this.templateDisplay = this.templateList.length ? true : false;
      }
    });
  }

  useTemplate(details: any, type: string) {
    details.type = type;
    
    this.dialog.open(ModalComponent, {
      width: '700px',
      data: {
        details: details,
        actions: [{
          id: 'ut',
          label: 'Use Template'
        }]
      }
    });
  }

  pagination(value: any) {
    this.templateCurrentPage = value;
    this.getTemplateList();
  }

}
