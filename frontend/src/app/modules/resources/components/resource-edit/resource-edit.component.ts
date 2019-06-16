import { Component, Input, OnInit } from '@angular/core';
import { Resource, ResourcesQuery, ResourcesService, ResourceType } from '../../state';
import { FormControl } from '@angular/forms';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-resource-edit',
  templateUrl: './resource-edit.component.html',
  styleUrls: ['./resource-edit.component.scss']
})
export class ResourceEditComponent implements OnInit {
  @Input() id;
  resource: Resource;

  editControls = {
    name: new FormControl(),
    type: new FormControl()
  };

  options: ResourceType[] = [];
  filteredOptions: Observable<ResourceType[]>;

  ngOnInit() {
    this.resource = this.resourceQuery.getEntity(this.id);
    this.editControls.type.setValue(this.resource.type);
    this.editControls.name.setValue(this.resource.name);
    this.resourceService.resourceTypesObservable().subscribe(types => {
      this.options = types;
    })
  }

  constructor(private resourceQuery: ResourcesQuery,
              private resourceService: ResourcesService) {
    this.filteredOptions = this.editControls.type.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.namePL),
        map(name => name ? this._filter(name) : this.options.slice())
      );
  }

  displayFn(resource?: ResourceType): string | undefined {
    return resource ? resource.namePL : undefined;
  }

  private _filter(name: string): ResourceType[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option =>
      option.namePL.toLowerCase().indexOf(filterValue) === 0);
  }

}
