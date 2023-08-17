/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LoginType } from '../models/LoginType';
import type { LoginUserDto } from '../models/LoginUserDto';
import type { User } from '../models/User';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class AuthEndpointsLoginGetProfileService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * User Login
     * @returns LoginType User logged in.
     * @throws ApiError
     */
    public authControllerLogin({
requestBody,
}: {
requestBody: LoginUserDto,
}): CancelablePromise<LoginType> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Incorrect Email or Password.`,
            },
        });
    }

    /**
     * Get User Profile
     * @returns User Profile has been successfully got.
     * @throws ApiError
     */
    public authControllerGetProfile(): CancelablePromise<User> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/auth/profile',
            errors: {
                401: `Need User Token for Getting User Profile`,
            },
        });
    }

}
