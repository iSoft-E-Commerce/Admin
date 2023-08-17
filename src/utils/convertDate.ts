import { format } from 'date-fns';

export const convertDate = (createdAt: string, updatedAt: string) => {
  return {
    formattedCreatedAt: format(new Date(createdAt), 'dd-MM-yyyy HH:mm'),
    formattedUpdatedAt: format(new Date(updatedAt), 'dd-MM-yyyy HH:mm'),
  };
};
