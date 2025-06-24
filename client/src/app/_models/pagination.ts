export interface Pagination{
    currentPage: number;
    itemsperPage: number;
    totalItems: number;
    totalPages: number;
}
export class PaginatedResult<T> {
    items?: T;
    pagination?: Pagination
}