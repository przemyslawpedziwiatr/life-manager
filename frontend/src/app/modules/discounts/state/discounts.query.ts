import { Injectable } from '@angular/core';
import { EntityUIQuery, QueryEntity } from '@datorama/akita';
import { DiscountsState, DiscountsStore } from './discounts.store';
import { Discounts, DiscountUI, DiscountUIState } from './discounts';

@Injectable({ providedIn: 'root' })
export class DiscountsQuery extends QueryEntity<DiscountsState, Discounts> {
  public ui: EntityUIQuery<DiscountUIState, DiscountUI>;

  constructor(protected store: DiscountsStore) {
    super(store);
    this.createUIQuery();
  }

  get editModeState() {
    return this.getValue().isEditModeOn;
  }
  //
  // public turnOnQuantitySaving(id) {
  //   this.store.ui.update(id, resourceUI => {
  //     return {
  //       ...resourceUI,
  //       isSaving: true
  //     }
  //   })
  // }
  //
  // public turnOffQuantitySaving(id) {
  //   this.store.ui.update(id, resourceUI => {
  //     return {
  //       ...resourceUI,
  //       isSaving: false
  //     }
  //   })
  // }
  //

}
