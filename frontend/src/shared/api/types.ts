import type { ApiStatuses } from './config/statuses'
import type { AxiosHeaderValue } from 'axios'
import type { ComputedRef, Ref } from 'vue'

export interface ResponseHeaders {
	[header: string]: AxiosHeaderValue | undefined ;
}

export interface FetchResponse<DataType, ErrorType> {
	data: DataType | undefined;
	error: ErrorType | undefined;
}

export interface ServerError<ErrorType> {
	errorInfo?: ErrorType | string;
	errorMessage?: string;
}

export interface ApiServiceErrorReturn<ErrorType> {
	error: Ref<ServerError<ErrorType> | null>;
}

export interface ApiServiceReturn<ErrorType> extends ApiServiceErrorReturn<ErrorType> {
	status: Readonly<Ref<ApiStatuses>>;
	isLoading: ComputedRef<boolean>;
	clearError: () => void;
}
