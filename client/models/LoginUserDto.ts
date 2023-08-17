/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocalBasketProduct } from './LocalBasketProduct';
import type { Product } from './Product';

export type LoginUserDto = {
    email: string;
    password: string;
    localWishlistProducts: Array<Product>;
    localBasketProducts: Array<LocalBasketProduct>;
};
