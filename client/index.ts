/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export { iSoftClient } from './iSoftClient';

export { ApiError } from './core/ApiError';
export { BaseHttpRequest } from './core/BaseHttpRequest';
export { CancelablePromise, CancelError } from './core/CancelablePromise';
export { OpenAPI } from './core/OpenAPI';
export type { OpenAPIConfig } from './core/OpenAPI';

export type { BasketDevice } from './models/BasketDevice';
export type { BasketProductDto } from './models/BasketProductDto';
export type { ChangeStatusDto } from './models/ChangeStatusDto';
export type { Characteristics } from './models/Characteristics';
export type { Color } from './models/Color';
export type { Contacts } from './models/Contacts';
export type { CreateOrderDataDto } from './models/CreateOrderDataDto';
export type { CreateProductDto } from './models/CreateProductDto';
export type { CreateQuestionDto } from './models/CreateQuestionDto';
export type { CreateRateDto } from './models/CreateRateDto';
export type { CreateTypeDto } from './models/CreateTypeDto';
export type { CreateUserDto } from './models/CreateUserDto';
export type { CurrentTasks } from './models/CurrentTasks';
export type { DeleteBasketProductDto } from './models/DeleteBasketProductDto';
export type { FilteredProducts } from './models/FilteredProducts';
export type { LocalBasketProduct } from './models/LocalBasketProduct';
export type { LoginType } from './models/LoginType';
export type { LoginUserDto } from './models/LoginUserDto';
export type { Message } from './models/Message';
export type { ModerateRateDto } from './models/ModerateRateDto';
export type { ModeratorReply } from './models/ModeratorReply';
export type { OrderData } from './models/OrderData';
export type { OrderDataProduct } from './models/OrderDataProduct';
export type { PaginatedProducts } from './models/PaginatedProducts';
export type { PaginatedUserQuestions } from './models/PaginatedUserQuestions';
export type { PaginatedUsers } from './models/PaginatedUsers';
export type { Product } from './models/Product';
export type { ProductPrice } from './models/ProductPrice';
export type { Rate } from './models/Rate';
export type { Rating } from './models/Rating';
export type { RatingTasks } from './models/RatingTasks';
export type { SocialMediaDTO } from './models/SocialMediaDTO';
export type { Token } from './models/Token';
export type { Type } from './models/Type';
export type { UpdateContactsDto } from './models/UpdateContactsDto';
export type { UpdateProductDto } from './models/UpdateProductDto';
export type { UpdateTypeDto } from './models/UpdateTypeDto';
export type { UpdateUserDto } from './models/UpdateUserDto';
export type { User } from './models/User';
export type { UserQuestion } from './models/UserQuestion';
export type { WishlistDevice } from './models/WishlistDevice';
export type { WishlistProductDto } from './models/WishlistProductDto';

export { AdminEndpointsService } from './services/AdminEndpointsService';
export { AuthEndpointsLoginGetProfileService } from './services/AuthEndpointsLoginGetProfileService';
export { BasketEndpointsService } from './services/BasketEndpointsService';
export { ContactsEndpointsService } from './services/ContactsEndpointsService';
export { OrdersHistoryEdpointsService } from './services/OrdersHistoryEdpointsService';
export { ProductEndpointsService } from './services/ProductEndpointsService';
export { QuestionEndpointsService } from './services/QuestionEndpointsService';
export { RateEndpointsService } from './services/RateEndpointsService';
export { TypeEndpointsService } from './services/TypeEndpointsService';
export { UserEndpointsService } from './services/UserEndpointsService';
export { WishlistEndpointsService } from './services/WishlistEndpointsService';
