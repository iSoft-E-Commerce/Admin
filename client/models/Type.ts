/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Characteristics } from './Characteristics';

export type Type = {
    id: number;
    createdAt: string;
    updatedAt: string;
    name: string;
    characteristics: Array<Characteristics>;
};
