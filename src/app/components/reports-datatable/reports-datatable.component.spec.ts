import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsDatatableComponent } from './reports-datatable.component';

describe('ReportsDatatableComponent', () => {
  let component: ReportsDatatableComponent;
  let fixture: ComponentFixture<ReportsDatatableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsDatatableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
