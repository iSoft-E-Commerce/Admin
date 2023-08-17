/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Characteristics } from './Characteristics';
import type { Color } from './Color';
import type { ProductPrice } from './ProductPrice';
import type { Rating } from './Rating';

export type Product = {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
    description: string;
    price: ProductPrice;
    isAvailable: boolean;
    isNewProduct: boolean;
    color: Color;
    colorName: string;
    memory: string;
    img: string;
    rating: Rating;
    characteristics: Array<Characteristics>;
    additionalCharacteristics: Array<Characteristics>;
};
