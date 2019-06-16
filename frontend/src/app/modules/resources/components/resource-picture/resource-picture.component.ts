import { Component, Input, OnInit } from '@angular/core';
import { Resource, ResourcesQuery } from '../../state';

@Component({
  selector: 'app-resource-picture',
  templateUrl: './resource-picture.component.html',
  styleUrls: ['./resource-picture.component.scss']
})
export class ResourcePictureComponent implements OnInit {
  @Input() id;
  pictureUrl: String;

  constructor(private resourceQuery: ResourcesQuery) { }

  ngOnInit() {
    this.pictureUrl = this.resourceQuery.getEntity(this.id).pictureUrl;
  }

  pictureStyle() {
    return `${this.pictureUrl}`;
  }

}
