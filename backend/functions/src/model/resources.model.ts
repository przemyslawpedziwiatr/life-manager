import {firestore} from "firebase-admin";

export const enum Quantity {
    LOW,
    MID,
    HIGH
}

export interface ResourceType {
    name: string;
    namePL: string;
}

export class ProductProvider {
    name: string = '';
    color: string = '';
}

export interface ProviderSource {
    type: firestore.DocumentReference;
    url: string;
}


export interface ResourceDTO {
    name: string;
    type: string;
    quantity: Quantity;
    pictureUrl: string;
    providers: Array<ProviderSource>;
}

export interface Resource {
    name: string;
    type: ResourceType;
    quantity: Quantity;
    pictureUrl: string;
    providers: Array<ProviderSource>;
}
