import { Pagination } from "../Pagination/pagination";

export type ApiResponse<T> = {
  data: T;
  status: number;
  message: string;
  pagination: Pagination;
 
}