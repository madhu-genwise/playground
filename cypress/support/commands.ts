// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import { saveState } from '../../src/utils/LocalStorage';
import { TOKEN_SESSION_KEY, LATITUDE, LONGITUDE } from '../../src/utils/CONSTANT';

Cypress.Commands.add('init', () => {
	cy.fixture('AppInfo/AppInfo').then((data) => {
		saveState(TOKEN_SESSION_KEY, data.token);
		saveState(LATITUDE, data.lat);
		saveState(LONGITUDE, data.long);
	});
});

Cypress.on('window:before:load', (win) => {
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	const androidObj = function () {};
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	Reflect.set(androidObj, 'nativeSupport', function () {});
	Reflect.set(win, 'androidObj', androidObj);
});
