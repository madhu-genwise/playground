import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, CancelToken } from 'axios';
import { toast } from 'react-toastify';

import { TOKEN_SESSION_KEY } from 'utils/Constants';
import { loadState } from 'utils/LocalStorage';
import { GLOBAL_CONSTANTS, MESSAGE_CONSTANTS } from 'utils/Constants';
import nativeHandshake from 'utils/nativeHandshake';

import { IAPIResponse, IError } from 'types';

const baseURL = process.env.REACT_APP_BASE_PATH_USER;
const env = process.env.REACT_APP_ENV;

const Request = axios.create({
	baseURL,
	headers: { 'Content-Type': 'application/json' },
});

const serializeError = (error: AxiosError): IError => {
	const { response } = error;
	if (!response) throw error;
	const { status, statusText, data } = response;
	const { message } = data;
	let errorMsg = '';
	try {
		errorMsg = JSON.parse(message).error.debug_msg;
	} catch (e) {
		errorMsg = message;
	}
	const errorObj = {
		name: 'API ERROR',
		message: errorMsg || statusText || `API FAILED (${status})`,
		code: status.toString(),
		stack: JSON.stringify(error.toJSON()),
	};
	return errorObj;
};

const tokenHeaderInterceptor = (config: AxiosRequestConfig): AxiosRequestConfig => {
	const token = loadState(TOKEN_SESSION_KEY);
	if (!token) return config;
	config.headers['token'] = token;
	return config;
};

const onErrorInterceptor = (error: AxiosError): IError => {
	throw serializeError(error);
};

Request.interceptors.request.use(tokenHeaderInterceptor);
Request.interceptors.response.use(undefined, onErrorInterceptor);

const getOriginalData = (data: any) => {
	const isObjectclientPayload = typeof data === 'object';
	if (isObjectclientPayload) {
		const originalData = { ...data };
		delete originalData['callback'];
		delete originalData['hideLoader'];
		return originalData;
	}
	return data;
};

const extractor = <T>(response: AxiosResponse<IAPIResponse<T>>, clientPayload?: any) => {
	!clientPayload?.hideLoader && nativeHandshake.hideLoader();
	const { payload, response_message }: any = response;
	if (!payload) toast.error(response_message || MESSAGE_CONSTANTS.SOMETHING_WRONG);
	const finalData = payload;
	clientPayload?.['callback']?.(finalData);
	return finalData;
};

const nativeExtractor = <T>(
	response: AxiosResponse<IAPIResponse<T>>,
	reducerActionCallback?: (data: any) => void,
	clientPayload?: any,
) => {
	!clientPayload?.hideLoader && nativeHandshake.hideLoader();
	const { payload, response_message }: any = response;
	if (!payload) toast.error(response_message || MESSAGE_CONSTANTS.SOMETHING_WRONG);
	console.log({
		clientPayload,
		response,
	});
	clientPayload?.['callback']?.(payload);
	reducerActionCallback && reducerActionCallback(payload);
};

const nativeApiCall = (
	method: string,
	path: string,
	clientPayload?: any,
	reducerActionCallback?: (data: any) => void,
): any => {
	return nativeHandshake
		.apiCall({
			url: baseURL,
			method,
			path,
			token: 'adasdasdadasd',
			...(method === 'POST' && { body: { data: getOriginalData(clientPayload) } }),
			...(method === 'GET' && { queries: getOriginalData(clientPayload) }),
		})
		.then((data: any) => {
			nativeExtractor(data.body, reducerActionCallback, clientPayload);
		})
		.catch((error: any) => {
			if (error?.status_code === 401) {
				nativeHandshake.logout();
			} else {
				toast.error(MESSAGE_CONSTANTS.SOMETHING_WRONG);
			}
		});
};

// Api Actions
export const Get = <T>(
	path: string,
	reducerActionCallback?: any,
	params?: any,
	cancelToken?: CancelToken,
): Promise<T> => {
	!params?.hideLoader && nativeHandshake.showLoader(GLOBAL_CONSTANTS.loaderDetails);
	return env === 'development'
		? Request.get<IAPIResponse<T>>(path, {
				params: getOriginalData(params),
				cancelToken,
		  }).then((data) => extractor(data, params))
		: nativeApiCall('GET', path, params, reducerActionCallback);
};

export const Post = <T>(
	path: string,
	clientPayload: any,
	reducerActionCallback?: any,
	cancelToken?: CancelToken,
): Promise<T> => {
	!clientPayload?.hideLoader && nativeHandshake.showLoader(GLOBAL_CONSTANTS.loaderDetails);
	return env === 'development'
		? Request.post<IAPIResponse<T>>(
				path,
				{ data: getOriginalData(clientPayload) },
				{
					cancelToken,
				},
		  ).then((data) => extractor(data, clientPayload))
		: nativeApiCall('POST', path, clientPayload, reducerActionCallback);
};

export const Put = <T>(
	path: string,
	clientPayload: any,
	reducerActionCallback?: any,
	cancelToken?: CancelToken,
): Promise<T> => {
	!clientPayload?.hideLoader && nativeHandshake.showLoader(GLOBAL_CONSTANTS.loaderDetails);
	return env === 'development'
		? Request.put<IAPIResponse<T>>(path, getOriginalData(clientPayload), {
				cancelToken,
		  }).then((data) => extractor(data, clientPayload))
		: nativeApiCall('PUT', path, clientPayload, reducerActionCallback);
};
