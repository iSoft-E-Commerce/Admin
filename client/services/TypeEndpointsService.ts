/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Type } from '../models/Type';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class TypeEndpointsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get all types of devices
     * @returns Type All types were successfully gotten.
     * @throws ApiError
     */
    public typeControllerGetTypes(): CancelablePromise<Array<Type>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/type/getAll',
            errors: {
                409: `Types are not found.`,
            },
        });
    }

}
