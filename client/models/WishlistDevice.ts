/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Product } from './Product';

export type WishlistDevice = {
    id: number;
    createdAt: string;
    updatedAt: string;
    product: Product;
};
