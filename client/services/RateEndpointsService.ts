/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateRateDto } from '../models/CreateRateDto';
import type { Rate } from '../models/Rate';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class RateEndpointsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Add rate
     * @returns Rate Rate has been successfully added
     * @throws ApiError
     */
    public rateControllerCreateRate({
requestBody,
}: {
requestBody: CreateRateDto,
}): CancelablePromise<Rate> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/rate/create',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `No possibility to rate a product`,
                404: `User or rating does not exist`,
                500: `An error occurred when saving the rate.`,
            },
        });
    }

    /**
     * Get checked rating
     * @returns Rate Checked rating has been successfully got
     * @throws ApiError
     */
    public rateControllerGetCheckedRating({
productId,
}: {
productId: number,
}): CancelablePromise<Array<Rate>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/rate/checked/{productId}',
            path: {
                'productId': productId,
            },
            errors: {
                404: `Product, rating or rate does not exist`,
            },
        });
    }

}
