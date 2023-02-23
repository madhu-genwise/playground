/* eslint-disable no-console */
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { isProd } from './Utils';

const sentryDSN = 'SENTRY_DNS'; // change this

export const initSentry = (): void => {
	try {
		if (isProd()) {
			Sentry.init({
				dsn: sentryDSN,
				integrations: [new Integrations.BrowserTracing()],
				tracesSampleRate: 1.0,
			});
		}
	} catch (e) {
		// eslint-disable-next-line no-undef
		console.error('SentryIntegrationError: ', e);
	}
};

/**
 * @function sendEvent
 * @param {object|string} event
 * @description manually send event/exception to Sentry
 */
export const sendEvent = (event: string | Error): void => {
	Sentry.captureException(event);
};
