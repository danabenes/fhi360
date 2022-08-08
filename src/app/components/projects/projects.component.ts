import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projectList = [{
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

  constructor() { }

  ngOnInit(): void {
  }

}
