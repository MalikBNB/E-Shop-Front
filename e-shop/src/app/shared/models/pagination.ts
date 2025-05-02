// import { IProduct } from './product';

// export interface IPagination {
//   pageIndex: number;
//   pageSize: number;
//   count: number;
//   data: IProduct[];
// }


export type Pagination<T> = {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: T[]
}
