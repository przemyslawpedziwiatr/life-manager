import { Component, OnInit } from '@angular/core';
import { Quantity, Resource, ResourcesQuery, ResourcesService, ResourcesStore } from '../../state';
import { EntityStateHistoryPlugin, guid, StateHistoryPlugin } from '@datorama/akita';
import { map, tap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-resources-bar',
  templateUrl: './resources-bar.component.html',
  styleUrls: ['./resources-bar.component.scss']
})
export class ResourcesBarComponent implements OnInit {
  history: StateHistoryPlugin;
  resourceTypes = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  sortTypes = [
    {value: 'quantity', viewValue: 'Ilość'},
    {value: 'name', viewValue: 'Nazwa'},
  ];
  sortControl = new FormControl('');

  constructor(private resourceService: ResourcesService,
              private resourceStore: ResourcesStore,
              private resourceQuery: ResourcesQuery) {
  }

  ngOnInit() {
    this.sortControl.valueChanges.pipe(
      tap(x => console.log(x))
    ).subscribe();
  }


  undo() {
      this.history.undo();
  }

  redo() {
      this.history.redo();
  }

  isEdit() {
    return this.resourceService && this.resourceService.isEdit();
  }

  turnOnEdit() {
    this.resourceService.turnOnEdit();
    this.history = new StateHistoryPlugin(this.resourceQuery);
    this.history.clear();
  }

  turnOffEdit() {
    this.history.destroy(true);
    this.resourceService.turnOffEdit();
  }

  save() {
    this.turnOffEdit();
  }

  cancel() {
    this.history.jumpToPast(0);
    this.turnOffEdit();
  }


  addItem() {
    this.resourceStore.add({
      name: '',
      quantity: Quantity.LOW,
      id: guid(),
      type: {}
    } as Resource);
  }

}
