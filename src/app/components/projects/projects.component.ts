import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  forApprovalList:any;
  approvedList:any;
  rejectedList:any;

  forApprovalCurrentPage: number = 1;
  approvedCurrentPage: number = 1;
  rejectedCurrentPage: number = 1;

  forApprovalTotalPage: any = 1;
  approvedTotalPage: any = 1;
  rejectedTotalPage: any = 1;

  forApprovalListDisplay: boolean = false;
  approvedListDisplay: boolean = false;
  rejectedListDisplay: boolean = false;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getUserForApprovalProjects();
    this.getApprovedProjects();
    this.getRejectedProjects();
  }

  getUserForApprovalProjects() {
    this.apiService.getApi('me/projects?status=forapproval&page='+this.forApprovalCurrentPage).subscribe(res => {
      if(res.status === 200) {
        this.forApprovalTotalPage = res.headers.get('x-pagination-page-count');
        this.forApprovalList = res.body;
        this.forApprovalListDisplay = this.forApprovalList.length ? true : false;
      } else {
        this.forApprovalListDisplay = false;
      }
    });
  }

  getApprovedProjects() {
    this.apiService.getApi('me/projects?status=approved&page='+this.approvedCurrentPage).subscribe(res => {
      if(res.status == 200) {
        this.approvedTotalPage = res.headers.get('x-pagination-page-count');
        this.approvedList = res.body;
        this.approvedListDisplay = this.approvedList.length ? true : false;
      } else {
        this.approvedListDisplay = false;
      }
    });
  }

  getRejectedProjects() {
    this.apiService.getApi('me/projects?status=rejected&page='+this.rejectedCurrentPage).subscribe(res => {
      if(res.status == 200) {
        this.rejectedTotalPage = res.headers.get('x-pagination-page-count');
        this.rejectedList = res.body;
        this.rejectedListDisplay = this.rejectedList.length ? true : false;
      } else {
        this.rejectedListDisplay = false;
      }
    });
  }

  pagination(section: string, value: any) {
    if(section === 'forApproval') {
      this.forApprovalCurrentPage = value;
      this.getUserForApprovalProjects();
    } else if(section === 'approved') {
      this.approvedCurrentPage = value;
      this.getApprovedProjects();
    } else {
      this.rejectedCurrentPage = value; 
      this.getRejectedProjects();
    }
  }

}
