export interface Pagination<T> {
  items: T[],
  pageCount: number,
  pageNumber: number,
  pageSize: number,
  totalItems: number
}