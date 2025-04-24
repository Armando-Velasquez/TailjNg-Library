// Respuesta del servidor
export interface ApiResponse<T> {
  ok: boolean;
  msg: string;
  data: T;
  meta?: MetaResponse;
}

export interface MetaResponse {
  page: PageResponse;
  sort: SortResponse;
}

export interface PageResponse {
  currentPage: number,
  totalPages: number,
  totalRecords: number,
  limit: number
}

export interface SortResponse {
  by: string;
  order: "ASC" | "DESC";
}
