/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Product } from './Product';

export type BasketDevice = {
    id: number;
    createdAt: string;
    updatedAt: string;
    quantity: number;
    product: Product;
};
