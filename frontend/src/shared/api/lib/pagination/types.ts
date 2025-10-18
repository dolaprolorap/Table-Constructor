import type { PaginationMeta as PaginationMetaApi } from '../../openapi/client'

export interface ResponseWithPaginationMeta {
  meta: PaginationMetaApi;
}