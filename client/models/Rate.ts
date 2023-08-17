/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ModeratorReply } from './ModeratorReply';
import type { User } from './User';

export type Rate = {
    id: number;
    createdAt: string;
    updatedAt: string;
    rate: number;
    review: string;
    isChecked: boolean;
    moderatorReply: ModeratorReply;
    user: User;
};
