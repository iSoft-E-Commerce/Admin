/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateOrderDataDto } from '../models/CreateOrderDataDto';
import type { Message } from '../models/Message';
import type { OrderData } from '../models/OrderData';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class OrdersHistoryEdpointsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get order-history
     * @returns OrderData Order-history has been successfully got
     * @throws ApiError
     */
    public ordersHistoryControllerGetOrdersHistory(): CancelablePromise<Array<OrderData>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/orders-history',
            errors: {
                401: `User does not have Token. User Unauthorized.`,
                404: `This orders-history does not exist.`,
            },
        });
    }

    /**
     * Add order-data
     * @returns Message Order data saved into user orders history.
     * @throws ApiError
     */
    public ordersHistoryControllerCreateOrderData({
requestBody,
}: {
/**
 * Each object in Array, it is each product in Basket (BasketDevice). You can get product in the Basket (id / quantity / product) from everyone User for testing Endpoint.
 */
requestBody: Array<CreateOrderDataDto>,
}): CancelablePromise<Message> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/orders-history/create-order-data',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `User does not have Token. User Unauthorized.`,
                404: `Users or basket orders history does not exist.`,
                409: `No possibility to create order data.`,
                500: `An error occurred when adding new order to the history.`,
            },
        });
    }

}
