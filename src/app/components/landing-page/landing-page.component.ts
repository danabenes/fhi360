import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { ModalComponent } from '../shared/modal/modal.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit, AfterViewInit, OnDestroy {
  private ngUnsubscribe = new Subject();

  templateList: any;
  designList: any;

  templateCurrentPage: number = 1;
  templateTotalPage: number = 1;
  designCurrentPage: number = 1;
  designTotalPage: number = 1;

  designDisplay: boolean = false;
  templateDisplay: boolean = true;

  preloaderStatus: boolean = false;


  constructor(
    public dialog: MatDialog,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.preloaderStatus = true;
    this.getRecentTemplates();
  }

  ngAfterViewInit(): void {
  }

  getRecentTemplates() {
    this.apiService.getApi('app/templates').pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      if(res.status === 200) {
        this.templateTotalPage = res.headers.get('x-pagination-page-count');
        this.templateList = res.body;
        this.templateDisplay = this.templateList.length ? true: false;
        this.getRecentDesigns();
      }
    });
  }

  getRecentDesigns() {
    this.apiService.getApi('me/projects?page='+this.designCurrentPage).subscribe(res => {
      if(res.status === 200) {
        this.designTotalPage = res.headers.get('x-pagination-page-count');
        this.designList = res.body;
        this.designDisplay = this.designList.length ? true : false;
        this.preloaderStatus = false;
      }
    });
  }

  handleRecentDesign(details: any, type: string, category: string) {
    details.type = type;
    
    let dialogRef = this.dialog.open(ModalComponent, {
      width: '700px',
      data: {
        details: details,
        actions: [{
          id: 'use',
          label: 'Use '+ category
        }]
      }
    });

    dialogRef.afterClosed().pipe(takeUntil(this.ngUnsubscribe)).subscribe( res => {
      if(res === 'use') {
        this.router.navigate(['create/'+category+'/'+details.id])
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

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
