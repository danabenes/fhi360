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

  constructor(
    public dialog: MatDialog,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getTemplateList();
  }

  getTemplateList() {
    this.apiService.getApi('app/templates').subscribe(res => {
      this.templateList = res;
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

}
