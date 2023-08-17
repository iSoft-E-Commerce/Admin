/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUserDto } from '../models/CreateUserDto';
import type { Message } from '../models/Message';
import type { Token } from '../models/Token';
import type { UpdateUserDto } from '../models/UpdateUserDto';
import type { User } from '../models/User';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class UserEndpointsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * SignUp
     * @returns Token User has been successfully created.
     * @throws ApiError
     */
    public userControllerCreate({
requestBody,
}: {
/**
 * User signup Credentials
 */
requestBody: CreateUserDto,
}): CancelablePromise<Token> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/user/signup',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `This email is already existed!`,
                500: `An error occurred when saving the new User.`,
            },
        });
    }

    /**
     * Get User Profile
     * @returns User User Profile has been got.
     * @throws ApiError
     */
    public userControllerGetUserData(): CancelablePromise<User> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/user/account',
            errors: {
                401: `User does not have Token. User Unauthorized.`,
                404: `User is not found.`,
                409: `Current user does not have any rights.`,
            },
        });
    }

    /**
     * Update User Data
     * @returns Message User has been updated.
     * @throws ApiError
     */
    public userControllerUpdateUserData({
requestBody,
}: {
requestBody: UpdateUserDto,
}): CancelablePromise<Message> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/user/update',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `User does not have Token. User Unauthorized.`,
                404: `User is not found.`,
                409: `Current user does not have any rights.`,
                500: `An error occured when updating the user.`,
            },
        });
    }

}
