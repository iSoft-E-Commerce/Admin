/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserQuestion } from './UserQuestion';

export type PaginatedUserQuestions = {
    itemsPerPage: Array<UserQuestion>;
    skip: number;
    total: number;
};
