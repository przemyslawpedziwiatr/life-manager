import { Component, OnInit } from '@angular/core';
import {ProductProvider, ResourcesService} from "../../state";

@Component({
  selector: 'app-resource-buy-providers',
  templateUrl: './resource-buy-providers.component.html',
  styleUrls: ['./resource-buy-providers.component.scss']
})
export class ResourceBuyProvidersComponent implements OnInit {
  public providers: Array<ProductProvider> = [];

  constructor(private resourceService: ResourcesService) { }

  ngOnInit() {
    this.resourceService.productProvidersObservable().subscribe(fetchedProviders => {
      this.providers = fetchedProviders;
    });
  }



}
