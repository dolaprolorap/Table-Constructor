import type { ResponseWithPaginationMeta } from './types'
import type { PaginationMeta } from '../../types'

export function mapApiResponseToPaginationMeta(response: ResponseWithPaginationMeta): PaginationMeta {
	const paginationMeta: PaginationMeta = {
		currentPage: response.meta.currentPage,
		from: response.meta.from,
		lastPage: response.meta.lastPage,
		perPage: response.meta.perPage,
		to: response.meta.to,
		total: response.meta.total
	}

	return paginationMeta
}