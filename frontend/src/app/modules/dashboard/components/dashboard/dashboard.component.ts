import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor() { }

  ngOnInit() { }

  toggle(isSidebarVisible) {
    return isSidebarVisible ? this.sidenav.close() : this.sidenav.open();
  }

}
