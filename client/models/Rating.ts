/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Rate } from './Rate';

export type Rating = {
    id: number;
    createdAt: string;
    updatedAt: string;
    rating: Array<Rate>;
};
