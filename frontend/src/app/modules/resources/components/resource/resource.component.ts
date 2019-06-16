import {Component, Input, OnInit} from '@angular/core';
import {Resource, ResourcesQuery, ResourcesService} from '../../state';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss']
})
export class ResourceComponent implements OnInit {
  @Input() id;
  resource: Resource;

  constructor(private resourceQuery: ResourcesQuery,
              private resourcesService: ResourcesService) { }

  get editModeState() {
    return this.resourceQuery.editModeState;
  }

  ngOnInit() {
    this.resource = this.resourceQuery.getEntity(this.id);
  }

  remove() {
    this.resourcesService.remove(this.id);
  }

}
