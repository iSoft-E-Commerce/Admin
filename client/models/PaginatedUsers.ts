/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { User } from './User';

export type PaginatedUsers = {
    itemsPerPage: Array<User>;
    skip: number;
    total: number;
};
