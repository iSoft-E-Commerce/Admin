/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SocialMediaDTO } from './SocialMediaDTO';

export type UpdateContactsDto = {
    phone: string;
    schedule: string;
    address: string;
    contactsId: number | null;
    socialMedia: Array<SocialMediaDTO>;
};
