// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IDispatcherType = any;

export interface IError {
	name: string;
	message: string;
	code: string;
	stack: string;
	data?: unknown;
}

export interface IAPIResponse<T> {
	success: boolean;
	status: boolean;
	message: string;
	data: T;
}

export interface IUserInfoResponse {
	beneficiaryName?: string;
	businessName?: string;
}
