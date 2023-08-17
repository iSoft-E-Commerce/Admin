/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateQuestionDto } from '../models/CreateQuestionDto';
import type { Message } from '../models/Message';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class QuestionEndpointsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Send user's question
     * @returns Message Question has been successfully sent.
     * @throws ApiError
     */
    public questionControllerCreateUserQuestion({
requestBody,
}: {
requestBody: CreateQuestionDto,
}): CancelablePromise<Message> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/question/user-question',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                500: `An error occurred when sending question.`,
            },
        });
    }

}
