<template>
  <CButton
    color="primary"
    class="w-100"
    @click="modal?.showModal()"
  >
    Ввести данные
  </CButton>

  <BaseModal
    ref="add-row-modal"
    @confirm="sendRequest"
  >
    <template #modal-header>
      Добавить объект
    </template>

    <template #modal-body>
      <div class="modal-body-content">
        <CForm
          autocomplete="off"
          class="add-form"
          @submit.prevent="sendRequest"
        >
          <template
            v-for="(col, idx) of table.columns"
            :key="idx"
          >
            <BaseSelect
              v-if="col.type === ColumnTypes.enum"
              :name="String(col.title)"
              :label="col.title"
              :options="[
                'Выберите тип',
                ...col.enumValues?.map((value)=>{
                  return {
                    label: capitalizeString(value),
                    value: value
                  }
                }) || []
              ]"
            />

            <BaseFormInput
              v-else
              id="table-title"
              :name="String(col.title)"
              :label="col.title"
              :autocomplete="false"
              :type="mapColumnTypeToInputType(col.type as ColumnTypes)"
            />
          </template>
        </CForm>
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { useForm, type YupSchema } from 'vee-validate'
import { toRefs, useTemplateRef, watch } from 'vue'
import { date, number, object, string } from 'yup'

import { ApiStatuses } from '@/shared/api'
import { capitalizeString } from '@/shared/lib/string'
import { BaseFormInput, BaseModal, BaseSelect } from '@/shared/ui/components'

import { ColumnTypes } from '@/entities/tables/columns'
import { useAddTableRow } from '@/entities/tables/rows'
import type { TableWithColumns } from '@/entities/tables/tables/model/types/tablesType'

interface AddRowProps {
	table: TableWithColumns,
}

const props = defineProps<AddRowProps>()
const { table } = toRefs(props)

const mapColumnTypeToInputType = (colType: ColumnTypes): 'text' | 'number' | 'date' => {
	if (colType === ColumnTypes.number) {
		return 'number'
	}

	if (colType === ColumnTypes.timestamp) {
		return 'date'
	}

	return 'text'
}

const generateValidationScheme = (): YupSchema => {

	let validationObject = {}

	const requiredMessage = 'Поле не может быть пустым'

	for (const column of table.value.columns) {

		let fieldValidation = null
		const DateValidation = date().required(requiredMessage)
		const StringValidation = string().required(requiredMessage)
		const EnumValidation = string().oneOf(column.enumValues || [], 'Некорректное значение').required(requiredMessage)
		const NumberValidation = number().required()

		if (column.type === ColumnTypes.enum) {
			fieldValidation = EnumValidation
		}

		if (column.type === ColumnTypes.number) {
			fieldValidation = NumberValidation
		}

		if (column.type === ColumnTypes.string) {
			fieldValidation = StringValidation
		}

		if (column.type === ColumnTypes.timestamp) {
			fieldValidation = DateValidation
		}

		if (!fieldValidation) {
			continue
		}

		validationObject = {
			...validationObject,
			[String(column.title)]: fieldValidation
		}
	}

	return object(validationObject)

}

const { handleSubmit } = useForm({
	validationSchema: generateValidationScheme()
})

const { addRow, status } = useAddTableRow()

const modal = useTemplateRef('add-row-modal')

interface FormValues { [key: string]: number | string | Date }

const sendRequest = handleSubmit((formValues: FormValues) => {
	console.log(formValues)
	console.log(table.value)
	addRow({
		tableId: table.value.id,
		data: Object.entries(formValues).map(([ key, value ]) => {
			return {
				columnId: Number(key),
				data: value
			}
		}),
	})
})

watch(status, () => {
	if (status.value === ApiStatuses.success) {
		modal.value?.closeModal()
	}
})

</script>

<style scoped>
.add-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.modal-body-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.import-btn {
  display: flex;
  align-items: center;
  gap: 6px;
}
</style>
