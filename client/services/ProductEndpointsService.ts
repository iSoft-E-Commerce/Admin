/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaginatedProducts } from '../models/PaginatedProducts';
import type { Product } from '../models/Product';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ProductEndpointsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Search Products by description
     * @returns Product Products have been successfully searched
     * @throws ApiError
     */
    public productControllerSearchProducts({
q,
}: {
q: string,
}): CancelablePromise<Array<Product>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/products/search',
            query: {
                'q': q,
            },
            errors: {
                404: `Product do not exist.`,
                500: `An error occurred when searching products.`,
            },
        });
    }

    /**
     * Get paginated new products
     * @returns PaginatedProducts New products have been got
     * @throws ApiError
     */
    public productControllerGetPaginatedNewProducts({
limit,
skip,
}: {
limit: number,
skip: number,
}): CancelablePromise<PaginatedProducts> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/products/newProducts',
            query: {
                'limit': limit,
                'skip': skip,
            },
            errors: {
                404: `No new products exist`,
            },
        });
    }

    /**
     * Get paginated discount products
     * @returns PaginatedProducts Discount products have been got
     * @throws ApiError
     */
    public productControllerGetPaginatedDiscountProducts({
limit,
skip,
}: {
limit: number,
skip: number,
}): CancelablePromise<PaginatedProducts> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/products/discountProducts',
            query: {
                'limit': limit,
                'skip': skip,
            },
            errors: {
                404: `No discount products exist`,
            },
        });
    }

    /**
     * Get products by Name
     * @returns PaginatedProducts Products by name have been got
     * @throws ApiError
     */
    public productControllerGetProductsByName({
nameTypeId,
limit,
skip,
filter,
}: {
nameTypeId: string,
limit: number,
skip: number,
filter?: string,
}): CancelablePromise<PaginatedProducts> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/products/byName/{nameTypeId}',
            path: {
                'nameTypeId': nameTypeId,
            },
            query: {
                'limit': limit,
                'skip': skip,
                'filter': filter,
            },
            errors: {
                404: `No products by name exist`,
            },
        });
    }

    /**
     * Get the same products by Name
     * @returns Product Products by the same name have been got
     * @throws ApiError
     */
    public productControllerGetTheSameProducts({
name,
}: {
name: string,
}): CancelablePromise<Array<Product>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/products/name/{name}',
            path: {
                'name': name,
            },
            errors: {
                404: `No products by name exist`,
            },
        });
    }

    /**
     * Get products by description
     * @returns Product Products by description have been got
     * @throws ApiError
     */
    public productControllerGetProductByDescription({
description,
}: {
description: string,
}): CancelablePromise<Product> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/products/byDescription/{description}',
            path: {
                'description': description,
            },
            errors: {
                404: `No products by description exist`,
            },
        });
    }

}
