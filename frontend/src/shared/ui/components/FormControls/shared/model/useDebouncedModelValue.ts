import { useDebounceFn } from '@vueuse/core'
import { onUnmounted, ref, watch, type Ref } from 'vue'

interface DebouncedModelValueParams<InputType> {
  inputModel: Ref<InputType | undefined>;
  debounce: number;
}

interface DebouncedModelValueReturn<InputType> {
  inputValue: Ref<InputType | undefined>;
}

export function useDebouncedModelValue<InputType=string>({ inputModel, debounce }: DebouncedModelValueParams<InputType>): DebouncedModelValueReturn<InputType> {
  const inputValue = ref<InputType>()

  const setInputModel = (): void => {
    inputModel.value = inputValue.value
  }

  const setInputModelDebounced = useDebounceFn(setInputModel, debounce)

  const setInputValue = (): void => {
    inputValue.value = inputModel.value
  }

  watch(inputValue, setInputModelDebounced)
  watch(inputModel, setInputValue, { immediate: true })

  onUnmounted(()=>{
    setInputModel()
  })

  return { inputValue }
}