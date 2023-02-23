/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NATIVE_KEYS, TYPE_FUNCTION, NATIVE_SUPPORT_KEY, ANDROID_OBJ } from './Constants';

// export const closeNativeHandshake = () => {
// 	closeWebView()
// 		.then((res) => console.log(res)) // eslint-disable-line no-console
// 		.catch((err) => console.error(err)); // eslint-disable-line no-console
// };

//@ts-ignore Property 'androidObj' does not exist on type 'Window & typeof globalThis'.
// window.androidObj = function AndroidClass() {};

/**
 * @name isAFunction
 * @description Function validator
 * @param {*} item
 */
const isAFunction = (item: any): boolean => typeof item === TYPE_FUNCTION;

/**
 * @name setAndroidClass
 * @description Set AndroidClass in window object for native injection
 */
const setAndroidClass = (): void => {
	//@ts-ignore Property 'androidObj' does not exist on type 'Window & typeof globalThis'.
	if (!isAFunction(window.androidObj)) {
		//@ts-ignore Property 'androidObj' does not exist on type 'Window & typeof globalThis'.
		window.androidObj = function AndroidClass(): void {};

		//@ts-ignore Property 'androidObj' does not exist on type 'Window & typeof globalThis'.
		sessionStorage.setItem(ANDROID_OBJ, window.androidObj.toString());
	}
};

/**
 * @name isNativeActivated
 * @description Checks the native support
 */
const isNativeActivated = (): boolean =>
	//@ts-ignore Property 'androidObj' does not exist on type 'Window & typeof globalThis'.
	isAFunction(window.androidObj) && window.androidObj[NATIVE_SUPPORT_KEY];

const nativeFunctions = {
	initNativeHandshake: async () => {
		return new Promise((resolve) => {
			//@ts-ignore Property 'androidObj' does not exist on type 'Window & typeof globalThis'.
			if (window.androidObj && window.androidObj.nativeSupport) {
				resolve(true);
				return;
			}

			setAndroidClass();
			const intervalRef = setInterval(() => {
				if (isNativeActivated()) {
					resolve(true);
					clearInterval(intervalRef);
					console.log(`%c << 🤖>> Native integration successfull ✅ ✅ ✅ ✅ ✅ `, 'color: blue; font-weight: bold;');
				}
			}, 500);
		});
	},
	sendRawNativeData: (nativeData: any) => {
		console.log({ nativeHookCalled: nativeData });

		//@ts-ignore Property 'androidObj' does not exist on type 'Window & typeof globalThis'.
		if (window.androidObj.nativeSupport)
			//@ts-ignore Property 'androidObj' does not exist on type 'Window & typeof globalThis'.
			window.androidObj.nativeSupport(JSON.stringify(nativeData));
	},
	apiCall: (request: any) => {
		return new Promise((resolve, reject) => {
			console.log({ apiCall: request });

			// Sample Request
			// const sampleRequest = {
			// 	PUT: {
			// 		url: 'https://reqres.in/',
			// 		method: 'put',
			// 		path: '/api/users/2',
			// 		headers: {
			// 			'content-type': 'application/json',
			// 			'fcm-token': 'some-token-to-be-added-on-put',
			// 		},
			// 		queries: {
			// 			version: '1.2.3',
			// 		},
			// 		body: {
			// 			name: 'morpheus',
			// 			job: 'zion resident',
			// 		},
			// 	},
			// 	DELETE: {
			// 		url: 'https://reqres.in/',
			// 		method: 'delete',
			// 		path: '/api/users/2',
			// 		headers: {
			// 			'content-type': 'application/json',
			// 			'fcm-token': 'some-token-to-be-added-on-delete',
			// 		},
			// 		queries: {
			// 			version: '1.2.3',
			// 		},
			// 	},
			// 	POST: {
			// 		url: 'https://reqres.in/',
			// 		method: 'post',
			// 		path: '/api/users',
			// 		headers: {
			// 			'content-type': 'application/json',
			// 			'fcm-token': 'some-token-to-be-added',
			// 		},
			// 		queries: {
			// 			version: '1.2.3',
			// 			cid: '12345',
			// 		},
			// 		body: {
			// 			name: 'morpheus',
			// 			job: 'leader',
			// 		},
			// 	},
			// 	GET: {
			// 		url: 'https://reqres.in/',
			// 		method: 'get',
			// 		path: 'api/users',
			// 		headers: {
			// 			'content-type': 'application/json',
			// 		},
			// 		queries: {
			// 			version: '1.2.3',
			// 			cid: '12345',
			// 			page: '2',
			// 		},
			// 	},
			// };

			request['headers'] = {
				...request['headers'],
				token: 'adasdasdadasd',
				'content-type': 'application/json',
			};

			//Native Data
			const nativeData = {
				key: NATIVE_KEYS.API_KEY,
				request,
				defaultHeader: true,
			};

			//Send Native Data To Android
			nativeFunctions.sendRawNativeData(nativeData);

			//Callback
			//@ts-ignore Property 'onWebNativeCallbackSuccess' does not exist on type 'Window & typeof globalThis'.
			window.onWebNativeCallbackSuccess = (data: any) => {
				const successData = JSON.parse(data);
				console.log({
					onWebNativeCallbackSuccessParsedData: successData,
				});
				resolve(successData);
			};

			//@ts-ignore Property 'onWebNativeCallbackFailure' does not exist on type 'Window & typeof globalThis'.
			window.onWebNativeCallbackFailure = (data: any) => {
				const failData = JSON.parse(data);
				console.log({
					onWebNativeCallbackFailure: failData,
				});
				reject(failData);
			};
		});
	},
	getAppInfo: () => {
		return new Promise((resolve, reject) => {
			//@ts-ignore Property 'callBackappInfo' does not exist on type 'Window & typeof globalThis'.
			window.callBackappInfo = (success, data) => {
				const parsedData = JSON.parse(data);
				localStorage.setItem('appInfo', data);
				localStorage.setItem('visa', parsedData['token']);
				localStorage.setItem('latitude', parsedData['latitude'] || '');
				localStorage.setItem('longitude', parsedData['longitude'] || '');
				if (success) {
					resolve(parsedData);
					console.log(data);
				} else {
					reject(data);
				}
			};

			//Native Data
			const nativeData = {
				key: NATIVE_KEYS.APP_INFO,
			};

			//Send Native Data To Android
			nativeFunctions.sendRawNativeData(nativeData);
		});
	},
	openCamera: () => {
		return new Promise((resolve, reject) => {
			//@ts-ignore Property 'callBackCamera' does not exist on type 'Window & typeof globalThis'.
			window.callBackCamera = (success, error, data) => {
				if (success) {
					const finalImage = 'data:image/jpeg;base64,' + data;
					resolve(finalImage);
				}
				if (error) {
					reject(data);
				}
			};

			//@ts-ignore Property 'callBackInternalCamera' does not exist on type 'Window & typeof globalThis'.
			window.callBackInternalCamera = (success, img) => {
				if (success) {
					const finalImage = 'data:image/jpeg;base64,' + img;
					resolve(finalImage);
				} else {
					reject();
				}
			};

			//Native Data
			const nativeData = {
				key: NATIVE_KEYS.CAMERA,
				cameraType: 2,
			};

			//Send Native Data To Android
			nativeFunctions.sendRawNativeData(nativeData);
		});
	},

	logout: () => {
		return new Promise((resolve, reject) => {
			//Native Data
			const nativeData = {
				key: NATIVE_KEYS.LOGOUT,
			};

			//Send Native Data To Android
			nativeFunctions.sendRawNativeData(nativeData);
		});
	},

	showLoader: (props: any) => {
		//Native Data
		const nativeData = {
			key: NATIVE_KEYS.SHOW_LOADER,
			json: { ...props },
			//remove this 2 when new apk is ready
			is_retry: true,
			...props,
		};

		//Send Native Data To Android
		nativeFunctions.sendRawNativeData(nativeData);
	},

	hideLoader: () => {
		//Native Data
		const nativeData = {
			key: NATIVE_KEYS.REMOVE_LOADER,
		};

		//Send Native Data To Android
		nativeFunctions.sendRawNativeData(nativeData);
	},

	shareViaWhatsapp: (text: string) => {
		return new Promise((resolve, reject) => {
			//@ts-ignore Property 'callbackWhatsAppShareSuccess' does not exist on type 'Window & typeof globalThis'.
			window.callbackWhatsAppShareSuccess = () => {
				resolve('Sharing Success');
			};

			//@ts-ignore Property 'callbackWhatsAppShareFailed' does not exist on type 'Window & typeof globalThis'.
			window.callbackWhatsAppShareFailed = (error) => {
				console.log(error);
				reject();
			};

			//Native Data
			const nativeData = {
				key: NATIVE_KEYS.SHARE_VIA_WHATSAPP,
				url: '',
				text,
			};

			//Send Native Data To Android
			nativeFunctions.sendRawNativeData(nativeData);
		});
	},

	shareGenerally: (text: string, packageName?: string) => {
		return new Promise((resolve, reject) => {
			//@ts-ignore Property 'callbackOtherAppShareSuccess' does not exist on type 'Window & typeof globalThis'.
			window.callbackOtherAppShareSuccess = () => {
				resolve('Sharing Success');
			};

			//@ts-ignore Property 'callbackOtherAppShareFailed' does not exist on type 'Window & typeof globalThis'.
			window.callbackOtherAppShareFailed = (error) => {
				console.log(error);
				reject();
			};

			//Native Data
			const nativeData = {
				key: NATIVE_KEYS.SHARE_GLOBALLY,
				url: '',
				...(packageName && { packageName }),
				text,
			};

			//Send Native Data To Android
			nativeFunctions.sendRawNativeData(nativeData);
		});
	},

	openURL: (url: string) => {
		return new Promise((resolve, reject) => {
			//Native Data
			const nativeData = {
				key: NATIVE_KEYS.OPEN_URL,
				url,
			};

			//Send Native Data To Android
			nativeFunctions.sendRawNativeData(nativeData);
		});
	},

	openDeepLinkWithoutCallback: (deeplink: string) => {
		return new Promise((resolve, reject) => {
			//Native Data
			const nativeData = {
				key: NATIVE_KEYS.OPEN_DEEPLINK_WITHOUT_CALLBACK,
				deeplink,
			};

			//Send Native Data To Android
			nativeFunctions.sendRawNativeData(nativeData);
		});
	},

	openDeepLinkWithCallback: (deeplink: string) => {
		return new Promise((resolve, reject) => {
			//Native Data
			const nativeData = {
				key: NATIVE_KEYS.OPEN_DEEPLINK_WITH_CALLBACK,
				deeplink,
			};

			//Send Native Data To Android
			nativeFunctions.sendRawNativeData(nativeData);
		});
	},

	biometric: () => {
		return new Promise((resolve, reject) => {
			//@ts-ignore Property 'callbackAuthenticateApp' does not exist on type 'Window & typeof globalThis'.
			window.callbackAuthenticateApp = (success, data) => {
				console.log({ success, data });
				success ? resolve(data) : reject(data);
			};

			//@ts-ignore Property 'callbackOpenAppSecuritySettings' does not exist on type 'Window & typeof globalThis'.
			window.callbackOpenAppSecuritySettings = (data) => {
				reject('openSettings');
			};

			//Native Data
			const nativeData = {
				key: NATIVE_KEYS.BIOMETRIC,
				title: 'Authorize GenWise',
				description: 'Unlock your screen with PIN, Pattern, Password, Face or Fingerprint',
			};

			//Send Native Data To Android
			nativeFunctions.sendRawNativeData(nativeData);
		});
	},
};

export default nativeFunctions;
