<template>
  <CCard
    id="contests-crud"
    class="p-3"
  >
    <UserToolbar
      v-model:role="userRole"
      v-model:login="searchLogin"
    />

    <CTable
      :columns="USER_TABLE_COLUMNS"
      align="middle"
      responsive
      hover
    >
      <CTableBody>
        <UsersTableContent :users="usersStore.users" />
      </CTableBody>
    </CTable>

    <DataLoader
      :is-loading="isLoading"
      empty-message="Конкурсов не найдено"
      :list-length="usersStore.users.length"
    />

    <BaseTablePagination
      v-model:current-page="currentPage"
      v-model:items-per-page="itemsPerPage"
      :visible="!isLoading"
      :last-page="paginationMeta?.lastPage || BaseTablePaginationConfig.DEFAULT_START_PAGE"
    />
  </CCard>

  <ErrorMessageModal
    :error="error"
    :error-message="error?.errorMessage && error?.errorMessage"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

import { DataLoader, BaseTablePagination, BaseTablePaginationConfig, ErrorMessageModal } from '@/shared/ui/components'

import type { UserRoles } from '@/entities/users'
import { useGetUsers } from '@/entities/users/api'
import { useUsersStore } from '@/entities/users/model/UsersStore'

import UserToolbar from './UsersToolbar.vue'
import { USER_TABLE_COLUMNS } from '../config'
import UsersTableContent from './UsersTableContent.vue'

const currentPage = ref<number>(BaseTablePaginationConfig.DEFAULT_START_PAGE)
const itemsPerPage = ref<number>(Number(BaseTablePaginationConfig.DEFAULT_ITEMS_PER_PAGE))
const userRole = ref<UserRoles>()
const searchLogin = ref<string>()

const usersStore = useUsersStore()

const { getUsers, isLoading, error, paginationMeta } = useGetUsers()

const sendRequest = (): void => {
	getUsers({
		login: searchLogin.value || undefined,
		page: currentPage.value,
		pageSize: itemsPerPage.value,
		role: userRole.value ? userRole.value : undefined
	})
}

watch([ currentPage, itemsPerPage, userRole, searchLogin ], sendRequest, { immediate: true })

const goToFirstPage = (): void => {
	currentPage.value = BaseTablePaginationConfig.DEFAULT_START_PAGE
}

watch([ userRole, searchLogin ], goToFirstPage, { immediate: true })

</script>

<style lang="scss" scoped>
    #contests-crud{
      display: flex;
      flex-direction: column;
      gap: 1rem
    }
  </style>
