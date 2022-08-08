import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  faSearch = faSearch;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  createDesign() {
    this.router.navigate(['create'])
  }

}
