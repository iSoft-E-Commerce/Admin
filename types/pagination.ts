export type Paginated<T> = {
  itemsPerPage: T[];
  skip: number;
  total: number;
};
