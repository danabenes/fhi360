import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { ModalComponent } from '../shared/modal/modal.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  templateList: any;
  designList: any;

  constructor(
    public dialog: MatDialog,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getRecentDesigns();
    this.getRecentTemplates();
  }

  getRecentDesigns() {
    this.apiService.getApi('me/projects').subscribe(res => {
      console.log(res);
      this.designList = res;
    });
  }

  getRecentTemplates() {
    this.apiService.getApi('app/templates').subscribe(res => {
      console.log(res);
      this.templateList = res;
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

}
