import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.scss']
})
export class PreloaderComponent implements OnInit {

  show: boolean = false;
  hide: boolean = true;

  @Input() handlePreloader: boolean = false;

  constructor() { }

  ngOnInit(): void {
    console.log(this.handlePreloader);
  }

}
