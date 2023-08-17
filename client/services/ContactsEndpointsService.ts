/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Contacts } from '../models/Contacts';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ContactsEndpointsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get contacts info
     * @returns Contacts Contacts info has been succesfully got
     * @throws ApiError
     */
    public contactsControllerGetContacts(): CancelablePromise<Array<Contacts>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/contacts',
        });
    }

}
