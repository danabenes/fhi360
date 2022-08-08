import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-reports-datatable',
  templateUrl: './reports-datatable.component.html',
  styleUrls: ['./reports-datatable.component.scss']
})
export class ReportsDatatableComponent implements OnInit {

  faSearch = faSearch;
  displayedColumns: any;
  dataSource: any;

  constructor() { }

  ngOnInit(): void {
    const data: any = [
      { title: 'National TB Lungs Month', project: 'TBFREE', organization: 'FHI 360', region: 'NCR', shares: 5, author: 'Mike Dela Cruz', dateAdded: 'May 4, 2022', actions: '', id: 1},
      { title: 'National TB Lungs Month', project: 'TBFREE', organization: 'FHI 360', region: 'NCR', shares: 10, author: 'Mike Dela Cruz', dateAdded: 'May 4, 2022', actions: '', id: 2},
      { title: 'National TB Lungs Month', project: 'TBFREE', organization: 'FHI 360', region: 'NCR', shares: 8, author: 'Mike Dela Cruz', dateAdded: 'May 4, 2022', actions: '', id: 3}
    ];

    this.displayedColumns = ['title', 'project', 'organization', 'region', 'shares', 'author', 'dateAdded', 'actions', 'id'];
    this.dataSource = data;
  }

}
