import { useFocus, useFocusWithin } from '@vueuse/core'
import { onMounted, ref, watch, type Ref } from 'vue'

interface VisibilityHandlersParams {
  selectInputId: string;
  disabled?: Ref<boolean>;
}

interface VisibilityHandlersReturn {
  optionsAreVisible: Ref<boolean>;
  setOptionsVisible: () => void;
  setOptionsUnvisible: () => void;
  setInputFocused: () => void;
}

export function useOptionsVisibilityHandlers({ selectInputId, disabled }: VisibilityHandlersParams): VisibilityHandlersReturn {
  const optionsAreVisible = ref<boolean>(false)

  const selectInput = ref<HTMLElement | null>(null)

  const setSelectElements = (): void => {
    selectInput.value = document.getElementById(selectInputId)
  }

  onMounted(setSelectElements)

  const inputFocusedWithin = useFocusWithin(selectInput)
  const inputFocused = useFocus(selectInput)

  const setOptionsVisible = (): void => {
    if (disabled?.value) {
      return
    }

    optionsAreVisible.value = true
  }

  const setOptionsUnvisible = (): void => {
    if (inputFocusedWithin.focused.value) {
      return
    }

    optionsAreVisible.value = false
  }

  const setInputFocused = (): void => {
    inputFocused.focused.value = true
  }

  watch(inputFocusedWithin.focused, () => {
    if (inputFocusedWithin.focused.value) {
      setInputFocused()
    }
  })

  return { optionsAreVisible, setOptionsVisible, setOptionsUnvisible, setInputFocused }
}