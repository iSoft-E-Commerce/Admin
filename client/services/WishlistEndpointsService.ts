/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Message } from '../models/Message';
import type { WishlistDevice } from '../models/WishlistDevice';
import type { WishlistProductDto } from '../models/WishlistProductDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class WishlistEndpointsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get User`s wishlist products
     * @returns WishlistDevice User`s wishlist was successfully gotten.
     * @throws ApiError
     */
    public wishlistControllerGetWishlistProducts(): CancelablePromise<Array<WishlistDevice>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/wishlist/products',
            errors: {
                401: `User does not have Token. User Unauthorized.`,
                404: `This wishlist does not exist.`,
                409: `No possibility to get products`,
            },
        });
    }

    /**
     * Adding device to the wishlist
     * @returns WishlistDevice A device was added into wishlist.
     * @throws ApiError
     */
    public wishlistControllerAddDevice({
requestBody,
}: {
requestBody: WishlistProductDto,
}): CancelablePromise<WishlistDevice> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/wishlist/add-device',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `User does not have Token. User Unauthorized.`,
                404: `Wishlist or product is not found.`,
                409: `No possibility to add a device or a product is already in wishlist.`,
            },
        });
    }

    /**
     * Product deleting from wishlist
     * @returns Message This product was deleted.
     * @throws ApiError
     */
    public wishlistControllerDeleteDevice({
requestBody,
}: {
requestBody: WishlistProductDto,
}): CancelablePromise<Message> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/wishlist/delete-product',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `User does not have Token. User Unauthorized.`,
                404: `This product does not exist in wishlist.`,
                409: `Something went wrong when deleting a device.`,
                500: `An error occurred when deleting the device.`,
            },
        });
    }

}
