import { Injectable } from '@angular/core';
import { ResourcesStore } from './resources.store';
import { HttpClient } from '@angular/common/http';
import { createResource, Quantity, Resource, ResourceType } from './resource';
import { BehaviorSubject, of, Subject, timer } from 'rxjs';
import { ResourcesQuery } from './resources.query';
import { EntityActions } from '@datorama/akita';

export interface ApiCallback {
  onSuccess?: Function;
  onError?: Function;
  onComplete?: Function;
}

@Injectable({ providedIn: 'root' })
export class ResourcesService {
  public resourceTypes: BehaviorSubject<Array<ResourceType>> = new BehaviorSubject([]);

  constructor(private resourcesStore: ResourcesStore,
              private resourcesQuery: ResourcesQuery,
              private http: HttpClient) {
    this.initData();
    this.fetchResourceTypes();

    this.resourcesQuery.selectEntityAction(EntityActions.Update).subscribe(ids => {
      console.log(this.resourcesQuery.getEntity(ids.pop()));
    });
  }

  private initData(): void {
    this.getResources();
  }

  remove(id: string) {
    this.resourcesStore.remove(id);
  }

  isEdit() {
    return this.resourcesQuery.editModeState;
  }

  public turnOnEdit() {
    this.resourcesStore.update({
      isEditModeOn: true
    });
  }

  public turnOffEdit() {
    this.resourcesStore.update({
      isEditModeOn: false
    });
  }

  getResources() {
    this.http.get(`resources`)
      .subscribe((serverResources: Array<Resource>) => {
        const convertedResources = serverResources.map(r => createResource(r));
        this.resourcesStore.set(convertedResources);
      });
  }

  fetchResourceTypes() {
    this.http.get('resources/types')
      .subscribe((types: Array<ResourceType>) => this.resourceTypes.next(types),
        () => this.resourceTypes.next([]));
  }

  resourceTypesObservable() {
    return this.resourceTypes.asObservable();
  }

  getResourceById(resourceId) {
    return this.resourcesQuery.getEntity(resourceId);
  }

  updateResourceQuantityInStore(resourceId, quantity) {
    this.resourcesStore.update(resourceId, resource => {
      return {
        ...resource,
        quantity
      };
    });
  }

  enlargeQuantity(resourceId, callbacks?: ApiCallback) {
    let resource: Resource = this.getResourceById(resourceId);
    let currentQuantity = resource.quantity;
    const newQuantity = resource.quantity + (resource.quantity === Quantity.HIGH ? 0 : 1);

    this.updateResourceQuantityInStore(resourceId, newQuantity);

    this.http.put(
      `resources/${resourceId}`,
      this.getResourceById(resourceId))
      .subscribe(
        () => {
          callbacks.onSuccess && callbacks.onSuccess();
        },
        () => {
          this.updateResourceQuantityInStore(resourceId, currentQuantity);
          callbacks.onError && callbacks.onError();
        },
        () => {
          callbacks.onComplete && callbacks.onComplete();
        }
      );
  }

  decreaseQuantity(resourceId, callbacks: ApiCallback) {
    let currentQuantity = this.getResourceById(resourceId).quantity;
    let resource: Resource = this.getResourceById(resourceId);
    const newQuantity = resource.quantity - (resource.quantity === Quantity.LOW ? 0 : 1);

    this.updateResourceQuantityInStore(resourceId, newQuantity);

    this.http.put(
      `resources/${resourceId}`,
      this.getResourceById(resourceId))
      .subscribe(
        () => callbacks.onSuccess && callbacks.onSuccess(),
        () => {
          this.updateResourceQuantityInStore(resourceId, currentQuantity);
          callbacks.onError && callbacks.onError();
        },
        () => callbacks.onComplete && callbacks.onComplete()
      );
  }

  uploadImage(resourceId, imageFile) {
    const formData = new FormData();
    formData.append('image', imageFile);
    return this.http.put(`resources/${resourceId}/picture`, imageFile);
  }
}
