/// <reference types="cypress" />
import { getURLParameter, closeNativeHandshake, initNativeHandshake } from '../../../src/utils/nativeSupport';

describe('Native Support', () => {
	it('should be able get parameters from href', () => {
		expect(
			getURLParameter('/?token=JDHJAHSDW3627236HD&latitude=79&longitude=79', 'token'),
			'get value of token from params',
		).to.equal('JDHJAHSDW3627236HD');
		expect(getURLParameter('/?latitude=79&longitude=79', 'token'), 'get value of token from params').to.equal('');
	});

	it('should be able close web view', () => {
		closeNativeHandshake();
	});

	it('should be able initiate native support', () => {
		cy.window()
			.then((win) => {
				// eslint-disable-next-line @typescript-eslint/no-empty-function
				const androidObj = function () {};
				// eslint-disable-next-line @typescript-eslint/no-empty-function
				Reflect.set(androidObj, 'nativeSupport', function () {});
				Reflect.set(win, 'androidObj', androidObj);
			})
			.then(() => {
				initNativeHandshake();
			});
	});
});
