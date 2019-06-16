import { Injectable } from '@angular/core';
import { EntityUIQuery, QueryEntity } from '@datorama/akita';
import { ResourcesStore, ResourcesState } from './resources.store';
import { Resource, ResourceUI, ResourceUIState } from './resource';

@Injectable({ providedIn: 'root' })
export class ResourcesQuery extends QueryEntity<ResourcesState, Resource> {
  public ui: EntityUIQuery<ResourceUIState, ResourceUI>;

  constructor(protected store: ResourcesStore) {
    super(store);
    this.createUIQuery();
  }

  get editModeState() {
    return this.getValue().isEditModeOn;
  }

  public turnOnQuantitySaving(id) {
    this.store.ui.update(id, resourceUI => {
      return {
        ...resourceUI,
        isSaving: true
      }
    })
  }

  public turnOffQuantitySaving(id) {
    this.store.ui.update(id, resourceUI => {
      return {
        ...resourceUI,
        isSaving: false
      }
    })
  }


}
