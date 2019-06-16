import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Resource, ResourcesQuery } from '../../state';

@Component({
  selector: 'app-resource-view',
  templateUrl: './resource-view.component.html',
  styleUrls: ['./resource-view.component.scss']
})
export class ResourceViewComponent implements OnInit, OnChanges {
  @Input() id;
  resource: Resource;

  constructor(private resourceQuery: ResourcesQuery) { }

  ngOnInit() {
    this.resource = this.resourceQuery.getEntity(this.id);
  }

  ngOnChanges() {
    this.resource = this.resourceQuery.getEntity(this.id);

  }

}
