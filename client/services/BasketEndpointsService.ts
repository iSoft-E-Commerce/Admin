/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BasketDevice } from '../models/BasketDevice';
import type { BasketProductDto } from '../models/BasketProductDto';
import type { DeleteBasketProductDto } from '../models/DeleteBasketProductDto';
import type { Message } from '../models/Message';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class BasketEndpointsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get basket products
     * @returns BasketDevice Basket products have been successfully got.
     * @throws ApiError
     */
    public basketControllerGetBasketProducts(): CancelablePromise<Array<BasketDevice>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/basket/products',
            errors: {
                401: `User does not have Token. User Unauthorized.`,
                404: `Basket doesn't exist.`,
                409: `No possibility to get products`,
            },
        });
    }

    /**
     * Adding products into user basket.
     * @returns Message Product added to basket or Product Quantity Updated.
     * @throws ApiError
     */
    public basketControllerAddDevice({
requestBody,
}: {
requestBody: BasketProductDto,
}): CancelablePromise<Message> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/basket/add-device',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `User does not have Token. User Unauthorized.`,
                404: `Basket or Product Doesn't exist`,
                409: `No possibility to add a device`,
                500: `An error occurred when adding the device.`,
            },
        });
    }

    /**
     * Deleting product from basket.
     * @returns Message Basket product has been deleted.
     * @throws ApiError
     */
    public basketControllerDeleteDevice({
requestBody,
}: {
requestBody: DeleteBasketProductDto,
}): CancelablePromise<Message> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/basket/delete-device',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `User does not have Token. User Unauthorized.`,
                404: `Basket or Product Doesn't exist`,
                409: `No possibility to delete a device from basket.`,
                500: `An error occurred when deleting the device.`,
            },
        });
    }

}
