/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { FetchHttpRequest } from './core/FetchHttpRequest';

import { AdminEndpointsService } from './services/AdminEndpointsService';
import { AuthEndpointsLoginGetProfileService } from './services/AuthEndpointsLoginGetProfileService';
import { BasketEndpointsService } from './services/BasketEndpointsService';
import { ContactsEndpointsService } from './services/ContactsEndpointsService';
import { OrdersHistoryEdpointsService } from './services/OrdersHistoryEdpointsService';
import { ProductEndpointsService } from './services/ProductEndpointsService';
import { QuestionEndpointsService } from './services/QuestionEndpointsService';
import { RateEndpointsService } from './services/RateEndpointsService';
import { TypeEndpointsService } from './services/TypeEndpointsService';
import { UserEndpointsService } from './services/UserEndpointsService';
import { WishlistEndpointsService } from './services/WishlistEndpointsService';

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class iSoftClient {

    public readonly adminEndpoints: AdminEndpointsService;
    public readonly authEndpointsLoginGetProfile: AuthEndpointsLoginGetProfileService;
    public readonly basketEndpoints: BasketEndpointsService;
    public readonly contactsEndpoints: ContactsEndpointsService;
    public readonly ordersHistoryEdpoints: OrdersHistoryEdpointsService;
    public readonly productEndpoints: ProductEndpointsService;
    public readonly questionEndpoints: QuestionEndpointsService;
    public readonly rateEndpoints: RateEndpointsService;
    public readonly typeEndpoints: TypeEndpointsService;
    public readonly userEndpoints: UserEndpointsService;
    public readonly wishlistEndpoints: WishlistEndpointsService;

    public readonly request: BaseHttpRequest;

    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = FetchHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? '',
            VERSION: config?.VERSION ?? '1.0',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });

        this.adminEndpoints = new AdminEndpointsService(this.request);
        this.authEndpointsLoginGetProfile = new AuthEndpointsLoginGetProfileService(this.request);
        this.basketEndpoints = new BasketEndpointsService(this.request);
        this.contactsEndpoints = new ContactsEndpointsService(this.request);
        this.ordersHistoryEdpoints = new OrdersHistoryEdpointsService(this.request);
        this.productEndpoints = new ProductEndpointsService(this.request);
        this.questionEndpoints = new QuestionEndpointsService(this.request);
        this.rateEndpoints = new RateEndpointsService(this.request);
        this.typeEndpoints = new TypeEndpointsService(this.request);
        this.userEndpoints = new UserEndpointsService(this.request);
        this.wishlistEndpoints = new WishlistEndpointsService(this.request);
    }
}
