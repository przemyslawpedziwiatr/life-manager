import {EntityState, guid, ID} from '@datorama/akita';

export interface Discounts {
    id: ID;
    date_added: Date;
    description_short: string;
    link: string;
    type: string;
}

export interface DiscountUI {
    isSaving: boolean;
}

export interface DiscountUIState extends EntityState<DiscountUI> {
}

export function createDiscount(params: Partial<Discounts>) {
    return {
        id: params.id || guid(),
        date_added: params.date_added || new Date().valueOf(),
        description_short: params.description_short || '',
        link: params.link || '',
        type: params.type || ''
    } as Discounts;
}
