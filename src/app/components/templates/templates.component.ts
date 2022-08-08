import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../shared/modal/modal.component';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {

  templateList = [{
    id: '001',
    bgColor: '#006168',
    title: '#TBFREE PH FAQ Design #2',
    category: 'Category'
  }, {
    id: '002',
    bgColor: '#24b5bf',
    title: 'Design #2',
    category: 'Category'
  }, {
    id: '003',
    bgColor: '#e5ca00',
    title: 'Design #3',
    category: 'Category'
  }, {
    id: '001',
    bgColor: '#006168',
    title: '#TBFREE PH FAQ Design #2',
    category: 'Category'
  }, {
    id: '002',
    bgColor: '#24b5bf',
    title: 'Design #2',
    category: 'Category'
  }, {
    id: '003',
    bgColor: '#e5ca00',
    title: 'Design #3',
    category: 'Category'
  }, {
    id: '001',
    bgColor: '#006168',
    title: '#TBFREE PH FAQ Design #2',
    category: 'Category'
  }, {
    id: '002',
    bgColor: '#24b5bf',
    title: 'Design #2',
    category: 'Category'
  }, {
    id: '003',
    bgColor: '#e5ca00',
    title: 'Design #3',
    category: 'Category'
  }];

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  useTemplate(details: any) {
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
