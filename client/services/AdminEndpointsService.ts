/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChangeStatusDto } from '../models/ChangeStatusDto';
import type { CreateProductDto } from '../models/CreateProductDto';
import type { CreateTypeDto } from '../models/CreateTypeDto';
import type { CurrentTasks } from '../models/CurrentTasks';
import type { Message } from '../models/Message';
import type { ModerateRateDto } from '../models/ModerateRateDto';
import type { OrderData } from '../models/OrderData';
import type { PaginatedProducts } from '../models/PaginatedProducts';
import type { PaginatedUserQuestions } from '../models/PaginatedUserQuestions';
import type { PaginatedUsers } from '../models/PaginatedUsers';
import type { Rate } from '../models/Rate';
import type { Type } from '../models/Type';
import type { UpdateContactsDto } from '../models/UpdateContactsDto';
import type { UpdateProductDto } from '../models/UpdateProductDto';
import type { UpdateTypeDto } from '../models/UpdateTypeDto';
import type { User } from '../models/User';
import type { UserQuestion } from '../models/UserQuestion';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class AdminEndpointsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get order history
     * @returns OrderData Order-history has been successfully got
     * @throws ApiError
     */
    public adminControllerGetOrdersHistory({
userId,
}: {
userId: number,
}): CancelablePromise<Array<OrderData>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/admin/user-orders/{userId}',
            path: {
                'userId': userId,
            },
            errors: {
                401: `User does not have Token. User Unauthorized.`,
                404: `This orders-history does not exist.`,
                409: `User does not have any rights.`,
            },
        });
    }

    /**
     * Get user
     * @returns User User has been successfully got
     * @throws ApiError
     */
    public adminControllerGetUserById({
id,
}: {
id: number,
}): CancelablePromise<User> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/admin/user/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `User does not have Token. User Unauthorized.`,
                404: `Current user does not exist.`,
                409: `Current user does not have any rights.`,
            },
        });
    }

    /**
     * Get Paginated Users
     * @returns PaginatedUsers Paginated users have been successfully got
     * @throws ApiError
     */
    public adminControllerGetPaginatedUsers({
limit,
skip,
}: {
limit: number,
skip: number,
}): CancelablePromise<PaginatedUsers> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/admin/users',
            query: {
                'limit': limit,
                'skip': skip,
            },
            errors: {
                401: `User does not have Token. User Unauthorized.`,
                404: `Users do not exist.`,
                409: `User does not have any rights.`,
            },
        });
    }

    /**
     * Search Users by firstName-lastName-email
     * @returns User Users have been successfully searched
     * @throws ApiError
     */
    public adminControllerSearchUsers({
q,
}: {
q: string,
}): CancelablePromise<Array<User>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/admin/users/search',
            query: {
                'q': q,
            },
            errors: {
                401: `User does not have Token. User Unauthorized.`,
                404: `Users do not exist.`,
                409: `User does not have any rights.`,
                500: `An error occurred when searching users.`,
            },
        });
    }

    /**
     * Change User Role
     * @returns any User role has been changed.
     * @throws ApiError
     */
    public adminControllerChangeUserRole({
requestBody,
}: {
requestBody: ChangeStatusDto,
}): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/admin/user-role',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `User has bad credentials.`,
                500: `An error occurred when saving the new User.`,
            },
        });
    }

    /**
     * User deleting
     * @returns Message User has been successfully deleted.
     * @throws ApiError
     */
    public adminControllerDeleteUser({
id,
}: {
id: number,
}): CancelablePromise<Message> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/admin/delete-user/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `User does not have Token. User Unauthorized.`,
                404: `Current user does not exist.`,
                409: `Current user does not have any rights.`,
                500: `An error occurred when deleting the user.`,
            },
        });
    }

    /**
     * Create Types of devices
     * @returns Type A type was successfully created.
     * @throws ApiError
     */
    public adminTypeControllerCreateType({
requestBody,
}: {
requestBody: CreateTypeDto,
}): CancelablePromise<Type> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/admin/create-type',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `User does not have Token. User Unauthorized.`,
                409: `No rights in user or current type already exists`,
                500: `An error occurred when saving the type.`,
            },
        });
    }

    /**
     * Edit the type
     * @returns Message Type has been updated.
     * @throws ApiError
     */
    public adminTypeControllerUpdateType({
id,
requestBody,
}: {
id: number,
requestBody: UpdateTypeDto,
}): CancelablePromise<Message> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/admin/edit-type/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `User does not have Token. User Unauthorized.`,
                409: `Current user does not have any rights.`,
                500: `An error occurred when updating the type.`,
            },
        });
    }

    /**
     * Delete the type
     * @returns Message Type has been deleted.
     * @throws ApiError
     */
    public adminTypeControllerDeleteType({
id,
}: {
id: number,
}): CancelablePromise<Message> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/admin/type/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `User does not have Token. User Unauthorized.`,
                404: `Current type not found.`,
                409: `Current user does not have any rights.`,
                500: `An error occurred when deleting the type.`,
            },
        });
    }

    /**
     * Get product rating
     * @returns Rate Product rating has been successfully got
     * @throws ApiError
     */
    public adminRateControllerGetAllRating({
productId,
}: {
productId: number,
}): CancelablePromise<Array<Rate>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/admin/rate/{productId}',
            path: {
                'productId': productId,
            },
            errors: {
                401: `No possibility to rate a product`,
                404: `Product, rating or rate does not exist`,
            },
        });
    }

    /**
     * Moderate rate
     * @returns Message Rate has been successfully moderated
     * @throws ApiError
     */
    public adminRateControllerModerateUserReview({
rateId,
requestBody,
}: {
rateId: number,
requestBody: ModerateRateDto,
}): CancelablePromise<Message> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/admin/moderate-rate/{rateId}',
            path: {
                'rateId': rateId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `No changes were made.`,
                401: `No possibility to rate a product`,
                404: `Current rate does not exist`,
                500: `An error occured when moderating the rate`,
            },
        });
    }

    /**
     * Delete rate
     * @returns Message Rate has been successfully deleted
     * @throws ApiError
     */
    public adminRateControllerDeleteRate({
rateId,
}: {
rateId: number,
}): CancelablePromise<Message> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/admin/moderate-rate/{rateId}',
            path: {
                'rateId': rateId,
            },
            errors: {
                400: `No changes were made.`,
                401: `No possibility to rate a product`,
            },
        });
    }

    /**
     * Get paginated products
     * @returns PaginatedProducts Products have been succesfully got
     * @throws ApiError
     */
    public adminProductControllerGetPaginatedProducts({
limit,
skip,
}: {
limit: number,
skip: number,
}): CancelablePromise<PaginatedProducts> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/admin/products',
            query: {
                'limit': limit,
                'skip': skip,
            },
            errors: {
                401: `Current user does not have any rights`,
                404: `Products do not exist`,
                409: `Current user does not have any rights`,
            },
        });
    }

    /**
     * Create new product
     * @returns any Product has been succesfully created
     * @throws ApiError
     */
    public adminProductControllerCreateProduct({
requestBody,
}: {
requestBody: CreateProductDto,
}): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/admin/product/create',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Name/TypeId/Desc/Color/Price/Characteristics/Img is Required fields.`,
                401: `User does not have Token. User Unauthorized.`,
                404: `Type for current product does not exist`,
                409: `Current product already exists or Current user does not have any rights`,
            },
        });
    }

    /**
     * Update product
     * @returns Message Product has been succesfully updated
     * @throws ApiError
     */
    public adminProductControllerUpdateProduct({
productId,
requestBody,
}: {
productId: number,
requestBody: UpdateProductDto,
}): CancelablePromise<Message> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/admin/product-edit/{productId}',
            path: {
                'productId': productId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `User does not have Token. User Unauthorized.`,
                404: `Current product does not exist`,
                409: `Current user does not have any rights`,
                500: `An error occurred when updating the product`,
            },
        });
    }

    /**
     * Delete product
     * @returns Message Product has been deleted
     * @throws ApiError
     */
    public adminProductControllerDeleteProduct({
id,
}: {
id: number,
}): CancelablePromise<Message> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/admin/product-delete/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `User does not have Token. User Unauthorized.`,
                404: `Current product does not exist`,
                409: `Current user does not have any rights`,
                500: `An error occurred when deleting the product`,
            },
        });
    }

    /**
     * Get paginated users questions
     * @returns PaginatedUserQuestions Questions have been succesfully got
     * @throws ApiError
     */
    public adminQuestionControllerGetPaginatedQuestions({
limit,
skip,
isChecked,
}: {
limit: number,
skip: number,
isChecked?: boolean,
}): CancelablePromise<PaginatedUserQuestions> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/admin/users-questions',
            query: {
                'limit': limit,
                'skip': skip,
                'isChecked': isChecked,
            },
            errors: {
                401: `Current user does not have any rights`,
                404: `Questions do not exist`,
                409: `Current user does not have any rights`,
            },
        });
    }

    /**
     * Get user question
     * @returns UserQuestion Question has been succesfully got
     * @throws ApiError
     */
    public adminQuestionControllerGetUserQuestion({
questionId,
}: {
questionId: number,
}): CancelablePromise<UserQuestion> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/admin/user-question/{questionId}',
            path: {
                'questionId': questionId,
            },
            errors: {
                401: `Current user does not have any rights`,
                404: `Question does not exist`,
                409: `Current user does not have any rights`,
            },
        });
    }

    /**
     * Moderate Question
     * @returns Message Question has been succesfully moderated
     * @throws ApiError
     */
    public adminQuestionControllerModerateQuestion({
questionId,
}: {
questionId: number,
}): CancelablePromise<Message> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/admin/moderate-question/{questionId}',
            path: {
                'questionId': questionId,
            },
            errors: {
                401: `Current user does not have any rights`,
                404: `Question do not exist`,
                409: `Current user does not have any rights`,
                500: `An error occurred when moderating user question.`,
            },
        });
    }

    /**
     * contactsId(in Dto) ? Update Contacts : Create Contacts
     * @returns Message Contacts has been succesfully updated
     * @throws ApiError
     */
    public adminContactsControllerUpdateContacts({
requestBody,
}: {
requestBody: UpdateContactsDto,
}): CancelablePromise<Message> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/admin/update-contacts',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Current user does not have any rights`,
                404: `Contacts do not exist`,
                409: `Current user does not have any rights`,
                500: `An error occurred when updating contacts.`,
            },
        });
    }

    /**
     * Get current tasks
     * @returns CurrentTasks Tasks have been succesfully got
     * @throws ApiError
     */
    public adminCurrentTasksControllerGetCurrentTasks(): CancelablePromise<CurrentTasks> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/admin/tasks',
            errors: {
                401: `Current user does not have any rights`,
                404: `Tasks do not exist`,
                409: `Current user does not have any rights`,
            },
        });
    }

}
