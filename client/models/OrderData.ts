/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OrderDataProduct } from './OrderDataProduct';

export type OrderData = {
    id: number;
    createdAt: string;
    updatedAt: string;
    products: Array<OrderDataProduct>;
};
