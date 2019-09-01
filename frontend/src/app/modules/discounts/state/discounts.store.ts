import { Injectable } from '@angular/core';
import { Entities, EntityState, EntityStore, EntityUIStore, HashMap, StoreConfig } from '@datorama/akita';
import { Discounts, DiscountUI, DiscountUIState } from './discounts';

export interface DiscountsState extends EntityState<Discounts> {
  filter?: string;
  isEditModeOn?: boolean;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'discounts' })
export class DiscountsStore extends EntityStore<DiscountsState, Discounts> {
  ui: EntityUIStore<DiscountUIState, DiscountUI>;

  constructor() {
    super({ filter: 'all', isEditModeOn: false});
    this.createUIStore().setInitialEntityState((entity: DiscountUI) => ({
      isSaving: false
    }));
  }


}

