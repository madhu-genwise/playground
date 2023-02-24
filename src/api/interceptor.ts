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
	const isObjectPayload = typeof data === 'object';
	if (isObjectPayload) {
		const originalData = { ...data };
		delete originalData['callback'];
		delete originalData['hideLoader'];
		return originalData;
	}
	return data;
};

const extractor = <T>(response: AxiosResponse<IAPIResponse<T>>, payload?: any) => {
	!payload?.hideLoader && nativeHandshake.hideLoader();
	const { data }: any = response;
	if (!response.status) toast.error(data?.message || MESSAGE_CONSTANTS.SOMETHING_WRONG);
	const finalData = data.data || data;
	payload?.['callback']?.(finalData);
	return finalData;
};

const nativeExtractor = <T>(
	response: AxiosResponse<IAPIResponse<T>>,
	reducerActionCallback?: (data: any) => void,
	payload?: any,
) => {
	!payload?.hideLoader && nativeHandshake.hideLoader();
	const { data, message }: any = response;
	if (!response.status) toast.error(message || data?.message || MESSAGE_CONSTANTS.SOMETHING_WRONG);
	console.log({
		payload,
		response,
	});
	payload?.['callback']?.(response);
	reducerActionCallback && reducerActionCallback(response);
};

const nativeApiCall = (
	method: string,
	path: string,
	payload?: any,
	reducerActionCallback?: (data: any) => void,
): any => {
	return nativeHandshake
		.apiCall({
			url: baseURL,
			method,
			path,
			token: 'adasdasdadasd',
			...(method === 'POST' && { body: { data: getOriginalData(payload) } }),
			...(method === 'GET' && { queries: getOriginalData(payload) }),
		})
		.then((data: any) => {
			nativeExtractor(data.body, reducerActionCallback, payload);
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
	payload: any,
	reducerActionCallback?: any,
	cancelToken?: CancelToken,
): Promise<T> => {
	!payload?.hideLoader && nativeHandshake.showLoader(GLOBAL_CONSTANTS.loaderDetails);
	return env === 'development'
		? Request.post<IAPIResponse<T>>(
				path,
				{ data: getOriginalData(payload) },
				{
					cancelToken,
				},
		  ).then((data) => extractor(data, payload))
		: nativeApiCall('POST', path, payload, reducerActionCallback);
};

export const Put = <T>(
	path: string,
	payload: any,
	reducerActionCallback?: any,
	cancelToken?: CancelToken,
): Promise<T> => {
	!payload?.hideLoader && nativeHandshake.showLoader(GLOBAL_CONSTANTS.loaderDetails);
	return env === 'development'
		? Request.put<IAPIResponse<T>>(path, getOriginalData(payload), {
				cancelToken,
		  }).then((data) => extractor(data, payload))
		: nativeApiCall('PUT', path, payload, reducerActionCallback);
};
