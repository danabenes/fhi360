import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { ModalComponent } from '../shared/modal/modal.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();

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

  preloaderStatus: boolean = false;

  constructor(
    private apiService: ApiService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.preloaderStatus = true;
    this.getForApprovalProjects();
  }

  handleTabChange(value:any) {
    if(value.index === 0) {
      this.getForApprovalProjects();
    } else if (value.index === 1) {
      this.getApprovedProjects();
    } else {
      this.getRejectedProjects();
    }
  }

  getForApprovalProjects() {
    this.apiService.getApi('me/projects?status=forapproval&page='+this.forApprovalCurrentPage).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      if(res.status === 200) {
        this.forApprovalTotalPage = res.headers.get('x-pagination-page-count');
        this.forApprovalList = res.body;
        this.forApprovalListDisplay = this.forApprovalList.length ? true : false;
        this.preloaderStatus = false;
      }
    });
  }

  getApprovedProjects() {
    this.preloaderStatus = true;
    this.apiService.getApi('me/projects?status=active&page='+this.approvedCurrentPage).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      if(res.status == 200) {
        this.approvedTotalPage = res.headers.get('x-pagination-page-count');
        this.approvedList = res.body;
        this.approvedListDisplay = this.approvedList.length ? true : false;
        this.preloaderStatus = false;
      }
    });
  }

  getRejectedProjects() {
    this.preloaderStatus = true;
    this.apiService.getApi('me/projects?status=reject&page='+this.rejectedCurrentPage).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      if(res.status == 200) {
        this.rejectedTotalPage = res.headers.get('x-pagination-page-count');
        this.rejectedList = res.body;
        this.rejectedListDisplay = this.rejectedList.length ? true : false;
        this.preloaderStatus = false;
      }
    });
  }

  useDesign(details: any) {
    details.type = 'withContent';
    let dialogRef = this.dialog.open(ModalComponent, {
      width: '700px',
      data: {
        details: details,
        actions: [{
          id: 'use',
          label: 'Use Design'
        }]
      }
    });

    dialogRef.afterClosed().pipe(takeUntil(this.ngUnsubscribe)).subscribe( res => {
      if(res === 'use') {
        this.router.navigate(['create/design/'+details.id])
      }
    });
  }

  pagination(section: string, value: any) {
    if(section === 'forApproval') {
      this.forApprovalCurrentPage = value;
      this.getForApprovalProjects();
    } else if(section === 'approved') {
      this.approvedCurrentPage = value;
      this.getApprovedProjects();
    } else {
      this.rejectedCurrentPage = value; 
      this.getRejectedProjects();
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
