import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { ModalComponent } from '../shared/modal/modal.component';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();

  templateList: any;

  templateCurrentPage: number = 1;
  templateTotalPage: number = 1;

  templateDisplay: boolean = false;
  preloaderStatus: boolean = false;

  constructor(
    public dialog: MatDialog,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getTemplateList();
  }

  getTemplateList() {
    this.preloaderStatus = true;
    this.apiService.getApi('app/templates?page='+this.templateCurrentPage).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      if(res.status == 200) {
        this.templateTotalPage = res.headers.get('x-pagination-page-count');
        this.templateList = res.body;
        this.templateDisplay = this.templateList.length ? true : false;
        this.preloaderStatus = false;
      }
    });
  }

  useTemplate(details: any, type: string) {
    details.type = type;
    let dialogRef = this.dialog.open(ModalComponent, {
      width: '700px',
      data: {
        details: details,
        actions: [{
          id: 'use',
          label: 'Use Template'
        }]
      }
    });

    dialogRef.afterClosed().pipe(takeUntil(this.ngUnsubscribe)).subscribe( res => {
      if(res === 'use') {
        this.router.navigate(['create/template/'+details.id])
      }
    });
  }

  pagination(value: any) {
    this.templateCurrentPage = value;
    this.getTemplateList();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
