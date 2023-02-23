export const TOKEN_SESSION_KEY = 'TOKEN';

export const LATITUDE = 'latitude';

export const LONGITUDE = 'longitude';

// Init obj constants
export const ANDROID_OBJ = 'androidObj';
export const NATIVE_SUPPORT_KEY = 'nativeSupport';

// Type constants
export const TYPE_FUNCTION = 'function';
export const TYPE_STRING = 'string';

export const NATIVE_KEYS = {
	API_KEY: 85,
	APP_INFO: 6,
	CAMERA: 55,
	LOGOUT: 63,
	SHOW_LOADER: 45,
	REMOVE_LOADER: 46,
	SHARE_VIA_WHATSAPP: 42,
	SHARE_GLOBALLY: 44,
	OPEN_URL: 8,
	BIOMETRIC: 20,
	OPEN_DEEPLINK_WITHOUT_CALLBACK: 2,
	OPEN_DEEPLINK_WITH_CALLBACK: 23,
};

export const GLOBAL_CONSTANTS: any = {
	PSP_MODAL_STATUS: {
		NO_PSP_INSTALLED: 'NO_PSP_INSTALLED',
		INVALID_PARAMS: 'INVALID_PARAMS',
		USER_CLOSED: 'USER_CLOSED',
	},
	API_STATUS: {
		SUCCESS: 1,
		LOADING: 0,
		FAIL: -1,
	},
	STATUS_REFRESH_API_TIMEOUT: 10000,
	STATUS_REFRESH_API_MAX_COUNT: 60,
	STATUS_CONSTANT: {
		SUCCESS: 'Successful',
		FAILED: 'Failed',
		FAILURE: 'Failed',
		PENDING: 'Pending',
		CANCELLED: 'Cancelled',
		PARKED: 'Successful',
	},
	APP_DEEPLINK: 'genwise://dynamic?key=home',
	APP_WEB_LINK: 'https://genwise.club',
	APP_EMAIL_ID: 'help@genwise.club',
	WROUTE: {
		TNC: 'tnc',
		DIGIO: 'digio',
		ADD_MONEY: 'addMoneyTransactionInit',
	},
	URL_PARAMETER: {
		WROUTE: 'wroute',
		ORDER_ID: 'OrderId',
		TXN_ID: 'txnId',
		APP_VERSION: 'appversion',
		CID: 'cid',
		CONSUMER_ID: 'consumerId',
		DEVICE_ID: 'deviceId',
		INSTALL_ID: 'installId',
		IS_VIRTUAL: 'is_virtual',
		LATITUDE: 'latitude',
		LONGITUDE: 'longitude',
		MANUFACTURER: 'manufacturer',
		MODEL: 'model',
		PLATFORM: 'platform',
		ROUTING_KEY: 'routing_key',
		SERIAL: 'serial',
		SIM_ID: 'simId',
		TOKEN: 'token',
		VERSION: 'version',
		VISA: 'visa',
	},
	loaderDetails: {
		first_message: 'loading',
		start_index: 0,
		range: 7,
		second_message: 'please wait',
	},
};

export const MESSAGE_CONSTANTS = {
	INVALID_DETAILS: 'Invalid Details Provided.',
	SOMETHING_WRONG: 'Something went wrong!!!',
	RESEND_OTP_SUCCESS: 'OTP sent successfully',
	AUTO_REFRESH_FAILED: 'Deeplink Failed to Open',
	NO_PSP_APP_FOUND: 'No Apps Found',
};
