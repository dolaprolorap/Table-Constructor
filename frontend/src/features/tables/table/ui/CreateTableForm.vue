<template>
  <CForm class="p-3" @submit.prevent="onSubmit">
    <CCardBody>
      <div class="mb-4">
        <CFormLabel class="fw-semibold">Название таблицы</CFormLabel>
        <CFormInput
          v-model.trim="internalTitle"
          placeholder="Введите название таблицы"
        />
      </div>

      <div class="mb-3">
        <CFormLabel class="fw-semibold">Задать число столбцов</CFormLabel>
        <CInputGroup>
          <CFormInput
            type="number"
            min="1"
            :max="MAX_COLUMNS"
            v-model.number="columnsCount"
            placeholder="Например, 3"
            @change="syncColumnsFromCount"
          />
        </CInputGroup>
        <small class="text-muted">Макс. {{ MAX_COLUMNS }}</small>
      </div>

      <div v-for="(column, index) in internalColumns" :key="column.id" class="mb-3">
        <CRow class="align-items-center gx-2">
          <CCol :xs="6">
            <CFormInput v-model.trim="column.name" placeholder="Название столбца" />
          </CCol>

          <CCol :xs="5">
            <CFormSelect v-model="column.type">
              <option disabled value="">Тип данных</option>
              <option value="string">Строка</option>
              <option value="number">Число</option>
              <option value="timestamp">Дата</option>
              <option value="enum">Справочник</option>
            </CFormSelect>
          </CCol>

          <CCol :xs="1" class="text-end">
            <CButton
              v-if="internalColumns.length > 1"
              color="danger"
              variant="outline"
              class="delete-btn"
              @click="removeColumn(index)"
            >
              ×
            </CButton>
          </CCol>
        </CRow>
      </div>

      <CButton
        class="w-100 my-3"
        color="primary"
        variant="outline"
        :disabled="internalColumns.length >= MAX_COLUMNS"
        @click="addColumn"
      >
        +
      </CButton>
    </CCardBody>
  </CForm>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

export type DataType = 'string' | 'number' | 'timestamp' | 'enum'

export interface Column {
  id: number
  name: string
  type: DataType | ''
}

export interface Props {
  title: string
  columns: Column[]
}

export interface Emits {
  (event: 'update:title', value: string): void
  (event: 'update:columns', value: Column[]): void
  (event: 'submit', value: { title: string; columns: Column[] }): void
}

const MAX_COLUMNS = 50

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const internalTitle = ref<string>(props.title)
const internalColumns = ref<Column[]>(
  props.columns?.length ? structuredClone(props.columns) : [{ id: 1, name: '', type: '' }]
)
const columnsCount = ref<number>(internalColumns.value.length)

watch(internalTitle, (value) => emit('update:title', value))
watch(
  internalColumns,
  (value) => emit('update:columns', structuredClone(value)),
  { deep: true }
)

watch(
  () => props.title,
  (value) => {
    if (value !== internalTitle.value) internalTitle.value = value
  }
)
watch(
  () => props.columns,
  (value) => {
    const asJson = JSON.stringify(value)
    const localJson = JSON.stringify(internalColumns.value)
    if (asJson !== localJson) {
      internalColumns.value = structuredClone(value)
      columnsCount.value = internalColumns.value.length
    }
  },
  { deep: true }
)

const addColumn = (): void => {
  internalColumns.value.push({
    id: Date.now() + Math.random(),
    name: '',
    type: '',
  })
  columnsCount.value = internalColumns.value.length
}

const removeColumn = (index: number): void => {
  internalColumns.value.splice(index, 1)
  columnsCount.value = internalColumns.value.length
}

const syncColumnsFromCount = (): void => {
  const normalized = Math.max(1, Math.min(columnsCount.value || 1, MAX_COLUMNS))
  while (internalColumns.value.length < normalized) addColumn()
  if (internalColumns.value.length > normalized) internalColumns.value.splice(normalized)
  columnsCount.value = normalized
}

const onSubmit = (): void => {
  emit('submit', {
    title: internalTitle.value.trim(),
    columns: internalColumns.value
      .map((column) => ({
        id: column.id,
        name: column.name.trim(),
        type: column.type,
      }))
      .filter((column) => column.name && column.type) as Column[],
  })
}
</script>

<style scoped>
.delete-btn {
  font-weight: bold;
  line-height: 1;
  width: 30px;
  height: 30px;
  padding: 0;
  transition: background 0.2s;
  border-radius: 50%;
}
.delete-btn:hover { background-color: rgba(220, 53, 69, 0.15); }

.form-card :is(input, select) { border-radius: 10px; }
</style>
