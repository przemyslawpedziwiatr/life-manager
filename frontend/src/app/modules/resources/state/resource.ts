import {EntityState, guid, ID} from '@datorama/akita';

export const enum Quantity {
    LOW,
    MID,
    HIGH
}

export interface ProductProvider {
    name: string;
    color: string;
}

export interface ResourceProvider {
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
    providers: Array<ResourceProvider>;
    type: ResourceType
}

export interface ResourceUI {
    isSaving: boolean;
}

export interface ResourceUIState extends EntityState<ResourceUI> {
}

export function createResource(params: Partial<Resource>) {
    return {
        id: params.id || guid(),
        name: params.name || 'Default name',
        quantity: params.quantity || Quantity.LOW,
        providers: params.providers || [],
        type: params.type || {name: 'N/A', namePL: 'N/A'}
    } as Resource;
}
