import { type Ref, watch } from 'vue'

import { DEFAULT_ITEMS_PER_PAGE, DEFAULT_START_PAGE } from '../config'

interface TablePaginationModelParams {
  currentPage: Ref<number>;
  itemsPerPage: Ref<string>;
  currentPageModel: Ref<number | undefined>;
  itemsPerPageModel: Ref<number | undefined>;
}

export function useTablePaginationModel({
  currentPage,
  itemsPerPage,
  currentPageModel,
  itemsPerPageModel
}: TablePaginationModelParams): void {
  const setCurrentPage = (): void => {
    currentPage.value = currentPageModel.value || DEFAULT_START_PAGE
  }

  const setCurrentPageModel = (): void => {
    currentPageModel.value = currentPage.value
  }

  watch(currentPageModel, setCurrentPage)
  watch(currentPage, setCurrentPageModel)

  const setItemsPerPage = (): void => {
    itemsPerPage.value = itemsPerPageModel.value?.toString() || DEFAULT_ITEMS_PER_PAGE.toString()
  }

  const setItemsPerPageModel = (): void => {
    itemsPerPageModel.value = Number(itemsPerPage.value)
  }

  watch(itemsPerPageModel, setItemsPerPage)
  watch(itemsPerPage, setItemsPerPageModel)
}