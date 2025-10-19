<template>
  <CButton
    id="add-table-btn"
    color="primary"
    @click="modal?.showModal()"
  >
    Создать таблицу
  </CButton>

  <BaseModal
    ref="create-table-modal"
    :submitted="meta.valid"
    :hidden="modalHidden"
    @close="closeModal"
    @confirm="sendRequest"
  >
    <template #modal-header>
      <TextWithIconWrapper :icon="iconsSet.plusIcon">
        <template #text>
          Создание новой таблицы
        </template>
      </TextWithIconWrapper>
    </template>

    <template #modal-body>
      <CForm
        autocomplete="off"
        class="add-form"
        @submit.prevent="sendRequest"
      >
        <BaseFormInput
          id="table-title"
          v-model.trim="title"
          :name="TITLE_FIELD_NAME"
          placeholder="Введите название таблицы"
          label="Название таблицы"
          :autocomplete="false"
        />

        <div class="columns-editor">
          <div class="columns-header">
            <span class="label">Столбцы</span>
            <CButton
              color="primary"
              variant="outline"
              size="sm"
              :disabled="columns.length >= MAX_COLUMNS"
              @click="addColumn"
            >
              <CIcon
                :icon="iconsSet.plusIcon"
              />
            </CButton>
          </div>

          <div
            v-for="(col, idx) in columns"
            :key="col.id"
            class="column-row"
          >
            <CRow class="align-items-center gx-2">
              <CCol :xs="6">
                <CFormInput
                  v-model.trim="col.title"
                  placeholder="Название столбца"
                />
              </CCol>

              <CCol :xs="5">
                <ColumnTypeSelect
                  v-model="col.type"
                  name=""
                />
              </CCol>

              <CCol
                :xs="1"
                class="text-end"
              >
                <CButton
                  v-if="columns.length > 1"
                  color="danger"
                  variant="outline"
                  class="delete-btn"
                  @click="removeColumn(idx)"
                >
                  <CIcon
                    :icon="iconsSet.xIcon"
                  />
                </CButton>
              </CCol>
            </CRow>

            <div
              v-if="col.type === 'enum'"
              class="enum-editor"
            >
              <CFormTextarea
                v-model="col.enumText"
                rows="2"
                placeholder="Значения enum через запятую: Новая, В работе, Закрыта"
              />
              <small class="text-muted">
                Введите варианты значений через запятую
              </small>
            </div>
          </div>
          <ErrorMessage
            :name="COLUMN_FIELD_NAME"
            class="error-message"
          />
        </div>
      </CForm>
    </template>
  </BaseModal>

  <ErrorMessageModal
    :error="error"
    :error-message="error?.errorMessage"
    @hide-error="clearError"
  />
</template>

<script setup lang="ts">
import { CButton, CForm, CFormInput, CRow, CCol, CFormTextarea } from '@coreui/vue'
import { ErrorMessage, useForm } from 'vee-validate'
import { ref, watch, useTemplateRef } from 'vue'

import { ApiStatuses } from '@/shared/api'
import { iconsSet } from '@/shared/ui/assets/icons'
import { TextWithIconWrapper, BaseModal, ErrorMessageModal, BaseFormInput } from '@/shared/ui/components'

import { ColumnTypes, ColumnTypeSelect, type Column } from '@/entities/tables/columns'
import { useCreateTable } from '@/entities/tables/tables'

import { addTableValidationSchema, TITLE_FIELD_NAME, COLUMN_FIELD_NAME } from '../config/validation'

interface NewColumn {
	id: number
	title: string
	type: ColumnTypes
	enumText?: string
}

const MAX_COLUMNS = 50

const modal = useTemplateRef('create-table-modal')

const { status, createTable, error, clearError } = useCreateTable()

const title = ref<string>('')

const columns = ref<NewColumn[]>([
	{ id: Date.now(), title: '', type: ColumnTypes.string },
])

const { handleSubmit, resetForm, meta, setFieldValue } = useForm({
	validationSchema: addTableValidationSchema,
})

const closeModal = (): void => {
	resetForm()
	title.value = ''
	columns.value = [{ id: Date.now(), title: '', type: ColumnTypes.string }]
}

const addColumn = (): void => {
	columns.value.push({ id: Date.now() + Math.random(), title: '', type: ColumnTypes.string })
}

const removeColumn = (index: number): void => {
	if (columns.value.length === 1) return

	columns.value.splice(index, 1)
}

const normalizedColumns = (): Omit<Column, 'id'>[] => {
	return columns.value.map(column =>
		({
			title: column.title.trim(),
			type: column.type,
			...(column.type === ColumnTypes.enum
				? {
					enumValues:
            column.enumText?.split(',').map(enumString =>
            	enumString.trim()).filter(Boolean) ?? [],
				}
				: {}),
		}))
}

watch(title, () => {
	setFieldValue(TITLE_FIELD_NAME, title.value)
})

watch(columns, () => {
	console.log(normalizedColumns())

	setFieldValue(COLUMN_FIELD_NAME, normalizedColumns())
}, { deep: true })

const sendRequest = handleSubmit(() => {
	createTable({
		title: title.value.trim(),
		columns: normalizedColumns(),
	})
})

watch(status, () => {
	if (status.value === ApiStatuses.success) {
		closeModal()
		modal.value?.closeModal()
	}
})

const modalHidden = ref<boolean>(false)
watch(error, () => {
	modalHidden.value = !!error.value
}, { deep: true })

</script>

<style scoped lang="scss">
#add-table-btn {
  width: 10rem;
}

.add-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.columns-editor {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.columns-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.enum-editor {
  margin-top: 1rem;
}

.delete-btn {
  font-weight: bold;
  line-height: 1;
  width: 30px;
  height: 30px;
  padding: 0;
  transition: background 0.2s;
  border-radius: 50%;
}
.delete-btn:hover {
  background-color: rgba(220, 53, 69, 0.15);
}

.error-message {
  width: 100%;
  font-size: 0.875em;
  color: var(--cui-form-invalid-color);
}
</style>
