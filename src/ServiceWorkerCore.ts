/* eslint-disable no-console */
function registerValidSW(swUrl: string) {
	navigator.serviceWorker
		.register(swUrl)
		.then((registration) => {
			registration.onupdatefound = () => {
				const installingWorker = registration.installing;
				if (installingWorker == null) {
					return;
				}
				installingWorker.onstatechange = () => {
					if (installingWorker.state === 'installed') {
						if (navigator.serviceWorker.controller) {
							console.log('New content is fetched but yet to service!!');
						} else {
							console.log('Content is precached now !!');
						}
					}
				};
			};
		})
		.catch((error) => {
			console.error('Error during service worker registration:', error);
		});
}

function checkValidServiceWorker(swUrl: string) {
	fetch(swUrl, {
		headers: { 'Service-Worker': 'script' },
	})
		.then((response) => {
			const contentType = response.headers.get('content-type');
			if (response.status === 404 || (contentType != null && contentType.indexOf('javascript') === -1)) {
				navigator.serviceWorker.ready.then((registration) => {
					registration.unregister().then(() => {
						window.location.reload();
					});
				});
			} else {
				registerValidSW(swUrl);
			}
		})
		.catch(() => {
			console.log('No internet connection found. App is running in offline mode.');
		});
}

const isLocal = Boolean(
	window.location.hostname === 'localhost' ||
		window.location.hostname === '[::1]' ||
		window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/),
);

export function register(currentBuildVersion: string): void {
	if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
		const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
		if (publicUrl.origin !== window.location.origin) {
			return;
		}

		window.addEventListener('load', async () => {
			// Clearing old data if any
			const versionJSON = `${process.env.PUBLIC_URL}/version.json`;
			const JSONResponse = await fetch(versionJSON);
			const versionData = await JSONResponse.json();
			const buildVersion = versionData.version;
			const cacheStatus = await clearCacheOnNewBuild(currentBuildVersion, buildVersion);
			if (cacheStatus == 'deleted') {
				await unregister();
				document.location.reload();
			}

			console.log('resolved', cacheStatus);

			// Registration
			const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

			if (isLocal) {
				checkValidServiceWorker(swUrl);
				navigator.serviceWorker.ready.then(() => {
					console.log('Service Worker Activated');
				});
			} else {
				// Is not localhost. Just register service worker
				registerValidSW(swUrl);
			}
		});
	}
}

export function unregister(): Promise<boolean | void> {
	return navigator?.serviceWorker?.ready
		.then((registration) => {
			return registration.unregister();
		})
		.catch((error) => {
			return console.error(error.message);
		});
}

export const clearCacheOnNewBuild = (currentBuildVersion: string, buildVersion: string): Promise<string> => {
	return new Promise((resolve) => {
		console.log('New BuildVersion', buildVersion, 'Current BuildVersion', currentBuildVersion);
		if (currentBuildVersion !== buildVersion) {
			console.log('New version found.');
			if (buildVersion) {
				if ('caches' in window) {
					caches.keys().then((keyList) => {
						return Promise.all(
							keyList.map((key) => {
								return caches.delete(key);
							}),
						);
					});
					resolve('deleted');
				}
			}
		}
		resolve('loading');
	});
};
