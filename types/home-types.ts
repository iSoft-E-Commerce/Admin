import type { User } from '../client';

export type HomeFromProps = {
  userData: User;
};

export type HomeFormInputs = {
  email: string;
  firstName: string;
  phone: string;
  lastName: string;
  img: string;
};
