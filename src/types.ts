// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IDispatcherType = any;

export interface IError {
	status: string;
	response_code: string;
	response_message?: unknown;
}

export interface IAPIResponse<T> {
	response_message: string;
	payload: T;
	status?: boolean;
	response_code?: string;
	meta?: any;
}

export interface IUserInfoResponse {
	username?: string;
}
