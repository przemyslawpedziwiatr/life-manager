import {Component, OnInit} from '@angular/core';
import {Resource, ResourcesQuery, ResourcesService, ResourcesState, ResourcesStore} from '../../state';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {ID} from '@datorama/akita/src/types';

@Component({
  selector: 'app-resources-page',
  templateUrl: './resources-page.component.html',
  styleUrls: ['./resources-page.component.scss']
})
export class ResourcesPageComponent implements OnInit {
  items$: Observable<Resource[]>;

  constructor(private resourceQuery: ResourcesQuery,
              private resourceStore: ResourcesStore,
              private resourcesService: ResourcesService,
              private router: Router) {
  }

  ngOnInit() {
    this.items$ = this.resourcesService.resources$;
  }


}
