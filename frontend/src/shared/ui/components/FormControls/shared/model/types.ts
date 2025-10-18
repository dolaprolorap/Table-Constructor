export interface SelectOption {
  label: string;
  labelPrompt?: string;
  value: string;
  disabled?: boolean;
}

export enum DefaultSelectOptions {
  all='all',
  none='none'
}

export type AllOption = 'all'
export type NoneOption = 'none'