import { EntityState, guid, ID } from '@datorama/akita';

export const enum Quantity {
  LOW,
  MID,
  HIGH
}

export interface ProductProvider {
  type: string;
  url: string;
}

export interface ResourceType {
  name: string;
  namePL: string;
}

export interface Resource {
  id: ID;
  name: string;
  quantity: Quantity;
  pictureUrl: string;
  providers: Array<ProductProvider>;
  type: ResourceType
}

export interface ResourceUI {
  isSaving: boolean;
}

export interface ResourceUIState extends EntityState<ResourceUI> {}

export function createResource(params: Partial<Resource>) {
  return {
    id: params.id || guid(),
    name: params.name || 'Default name',
    quantity: params.quantity || Quantity.LOW,
    pictureUrl: params.pictureUrl || '/assets/no_provider.png',
    providers: params.providers || [],
    type: params.type || {name: 'N/A', namePL: 'N/A'}
  } as Resource;
}
