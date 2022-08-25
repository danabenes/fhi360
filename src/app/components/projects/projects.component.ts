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

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getUserForApprovalProjects();
    this.getApprovedProjects();
    this.getRejectedProjects();
  }

  getUserForApprovalProjects() {
    this.apiService.getApi('me/projects?status=forapproval').subscribe(res => {
      this.forApprovalList = res;
    });
  }

  getApprovedProjects() {
    this.apiService.getApi('me/projects?status=active').subscribe(res => {
      this.forApprovalList = res;
    });
  }

  getRejectedProjects() {
    this.apiService.getApi('me/projects?status=rejected').subscribe(res => {
      this.forApprovalList = res;
    });
  }

}
