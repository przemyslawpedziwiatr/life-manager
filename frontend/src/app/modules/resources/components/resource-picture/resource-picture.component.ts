import { Component, Input, OnInit } from '@angular/core';
import {Resource, ResourcesQuery, ResourcesService} from '../../state';

@Component({
  selector: 'app-resource-picture',
  templateUrl: './resource-picture.component.html',
  styleUrls: ['./resource-picture.component.scss']
})
export class ResourcePictureComponent implements OnInit {
  @Input() id;
  pictureUrl: String;

  constructor(private resourceQuery: ResourcesQuery,
              public resourceService: ResourcesService) { }

  ngOnInit() {
    this.resourceService.receiveImage(this.id).subscribe(
        imageUrl => this.pictureUrl = imageUrl,
        () => this.pictureUrl = '/assets/no-product.png'
    );
  }

  pictureStyle() {
    // return `${this.pictureUrl}`;
    return;
  }

}
