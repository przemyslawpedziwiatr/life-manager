import { Injectable } from '@angular/core';
import { Entities, EntityState, EntityStore, EntityUIStore, HashMap, StoreConfig } from '@datorama/akita';
import { Resource, ResourceUI, ResourceUIState } from './resource';
import {resources} from '../data.model';

export interface ResourcesState extends EntityState<Resource> {
  filter?: string;
  isEditModeOn?: boolean;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'resources' })
export class ResourcesStore extends EntityStore<ResourcesState, Resource> {
  ui: EntityUIStore<ResourceUIState, ResourceUI>;

  constructor() {
    super({ filter: 'all', isEditModeOn: false});
    this.createUIStore().setInitialEntityState((entity: ResourceUI) => ({
      isSaving: false
    }));
  }


}

