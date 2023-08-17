/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FilteredProducts } from './FilteredProducts';
import type { Product } from './Product';

export type PaginatedProducts = {
    itemsPerPage: Array<Product>;
    skip: number;
    total: number;
    filteredProducts: FilteredProducts;
};
