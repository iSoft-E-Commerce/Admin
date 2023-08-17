/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Characteristics } from './Characteristics';
import type { Color } from './Color';
import type { ProductPrice } from './ProductPrice';

export type UpdateProductDto = {
    name: string;
    description: string;
    colorName: string;
    price: ProductPrice;
    color: Color;
    memory: string;
    img: string;
    isAvailable: boolean;
    isNewProduct: boolean;
    characteristics: Array<Characteristics>;
    additionalCharacteristics: Array<Characteristics>;
};
