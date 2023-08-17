/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SocialMediaDTO } from './SocialMediaDTO';

export type Contacts = {
    id: number;
    createdAt: string;
    updatedAt: string;
    phone: string;
    address: string;
    schedule: string;
    socialMedia: Array<SocialMediaDTO>;
};
