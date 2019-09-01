import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {createDiscount, Discounts } from './discounts';
import {BehaviorSubject} from 'rxjs';
import {EntityActions} from '@datorama/akita';
import {AngularFireStorage} from "@angular/fire/storage";
import { DiscountsStore } from './discounts.store';
import { DiscountsQuery } from './discounts.query';

export interface ApiCallback {
  onSuccess?: Function;
  onError?: Function;
  onComplete?: Function;
}

@Injectable({ providedIn: 'root' })
export class DiscountsService {
  private _discounts: BehaviorSubject<Array<Discounts>> = new BehaviorSubject([]);
  readonly discounts$ = this._discounts.asObservable();

  constructor(private discountsStore: DiscountsStore,
              private discountsQuery: DiscountsQuery,
              private http: HttpClient) {
    this.initData();

    this.discountsQuery.selectEntityAction(EntityActions.Update).subscribe(ids => {
      console.log(this.discountsQuery.getEntity(ids.pop()));
    });

    this.discounts = [... this.discountsQuery.getAll()];
  }

  private initData(): void {
    this.getDiscounts();
  }

  public get discounts() {
    return this._discounts.getValue();
  }

  public set discounts(val: Discounts[]) {
      this._discounts.next(val);
  }

  remove(id: string) {
    this.discountsStore.remove(id);
  }

  isEdit() {
    return this.discountsQuery.editModeState;
  }

  public turnOnEdit() {
    this.discountsStore.update({
      isEditModeOn: true
    });
  }

  public turnOffEdit() {
    this.discountsStore.update({
      isEditModeOn: false
    });
  }

  getDiscounts() {
    this.http.get(`discounts`)
      .subscribe((serverDiscounts: Array<Discounts>) => {
        const convertedResources = serverDiscounts.map(r => createDiscount(r));
        this.discountsStore.set(convertedResources);
        this.discounts = [... convertedResources];
      });
  }
  //
  // fetchResourceTypes() {
  //   this.http.get('resources/types')
  //     .subscribe((types: Array<ResourceType>) => this.resourceTypes.next(types),
  //       () => this.resourceTypes.next([]));
  // }
  //
  // fetchProductProviders() {
  //   this.http.get('dictionaries/providers')
  //     .subscribe((fetchedProviders: Array<ProductProvider>) => this.productProviders.next(fetchedProviders),
  //       () => this.productProviders.next([]));
  // }
  //
  // resourceTypesObservable() {
  //   return this.resourceTypes.asObservable();
  // }
  //
  // productProvidersObservable() {
  //   return this.productProviders.asObservable();
  // }
  //
  // getResourceById(resourceId) {
  //   return this.resourcesQuery.getEntity(resourceId);
  // }
  //
  // updateResourceQuantityInStore(resourceId, quantity) {
  //   this.resourcesStore.update(resourceId, resource => {
  //     return {
  //       ...resource,
  //       quantity
  //     };
  //   });
  // }
  //
  // enlargeQuantity(resourceId, callbacks?: ApiCallback) {
  //   let resource: Discounts = this.getResourceById(resourceId);
  //   let currentQuantity = resource.quantity;
  //   const newQuantity = resource.quantity + (resource.quantity === Quantity.HIGH ? 0 : 1);
  //
  //   this.updateResourceQuantityInStore(resourceId, newQuantity);
  //
  //   this.http.put(
  //     `resources/${resourceId}`,
  //       {quantity: this.getResourceById(resourceId).quantity})
  //     .subscribe(
  //       () => {
  //         callbacks.onSuccess && callbacks.onSuccess();
  //       },
  //       () => {
  //         this.updateResourceQuantityInStore(resourceId, currentQuantity);
  //         callbacks.onError && callbacks.onError();
  //       },
  //       () => {
  //         callbacks.onComplete && callbacks.onComplete();
  //       }
  //     );
  // }
  //
  // decreaseQuantity(resourceId, callbacks: ApiCallback) {
  //   let currentQuantity = this.getResourceById(resourceId).quantity;
  //   let resource: Discounts = this.getResourceById(resourceId);
  //   const newQuantity = resource.quantity - (resource.quantity === Quantity.LOW ? 0 : 1);
  //
  //   this.updateResourceQuantityInStore(resourceId, newQuantity);
  //
  //   this.http.put(
  //     `resources/${resourceId}`,
  //       {quantity: this.getResourceById(resourceId).quantity})
  //     .subscribe(
  //       () => callbacks.onSuccess && callbacks.onSuccess(),
  //       () => {
  //         this.updateResourceQuantityInStore(resourceId, currentQuantity);
  //         callbacks.onError && callbacks.onError();
  //       },
  //       () => callbacks.onComplete && callbacks.onComplete()
  //     );
  // }
  //
  // uploadImage(resourceId, imageFile) {
  //   const formData = new FormData();
  //   formData.append('file', imageFile);
  //   return this.http.put(`resources/${resourceId}/picture`, formData);
  // }
  //
  // removeImage(resourceId) {
  //   return this.http.delete(`resources/${resourceId}/picture`);
  // }
  //
  // receiveImage(resourceName) {
  //   return this.firebaseService.ref(`resources/${resourceName}.jpg`).getDownloadURL();
  // }
}
