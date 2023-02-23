import './styles/index.scss';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './app';

import store from './store';
import reportWebVitals from './reportWebVitals';
import { initSentry } from './utils/Sentry';

import * as ServiceWorker from './ServiceWorkerCore';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pjson = require('../package.json');
// eslint-disable-next-line no-console
console.log(`------ Version: ${pjson.version} - Build: ${process.env.REACT_APP_ENV}`);

const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
);

// initialized sentry
initSentry();

try {
	// Register worker
	ServiceWorker.register(pjson.version);
} catch (e) {
	// eslint-disable-next-line no-console
	console.error('Service Worker Failed', e);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
