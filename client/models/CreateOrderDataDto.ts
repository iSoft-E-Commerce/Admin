/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Product } from './Product';

export type CreateOrderDataDto = {
    /**
     * id = baskedDeviceId from user Basket.
     */
    id: number;
    /**
     * Quantity Each product in Basket
     */
    quantity: number;
    product: Product;
};
