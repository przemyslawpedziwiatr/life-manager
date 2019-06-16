import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resource-buy',
  templateUrl: './resource-buy.component.html',
  styleUrls: ['./resource-buy.component.scss']
})
export class ResourceBuyComponent implements OnInit {
  isShowingProviders: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  dropdownVisibility() {
    return this.isShowingProviders ? 'flex' : 'none';
  }

  close() {
    this.isShowingProviders = false;
  }

  open() {
    this.isShowingProviders = true;
  }
}
