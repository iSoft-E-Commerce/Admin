/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Characteristics } from './Characteristics';
import type { Color } from './Color';
import type { ProductPrice } from './ProductPrice';

export type CreateProductDto = {
    name: string;
    description: string;
    price: ProductPrice;
    color: Color;
    memory: string;
    img: string;
    isAvailable: boolean;
    isNewProduct: boolean;
    typeId: number;
    characteristics: Array<Characteristics>;
    additionalCharacteristics: Array<Characteristics>;
};
