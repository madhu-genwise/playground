const COMMON_HEADERS = {
	'Content-Type': 'application/json',
	Accept: 'application/json',
};

const DEFAULT_INTERCEPTOR_CONFIG = {
	defaultLoader: true,
	defaultError: true,
	handleRetry: false,
	useMetaData: false,
	hasFormData: false,
	fullResponse: false,
};

export { COMMON_HEADERS, DEFAULT_INTERCEPTOR_CONFIG };

export default {
	userInfo: '/user',
};
