/// <reference types="cypress" />
import { saveState, loadState, removeState } from '../../../src/utils/LocalStorage';
import { TOKEN_SESSION_KEY, LATITUDE } from '../../../src/utils/CONSTANT';

describe('Local Storage', () => {
	it('should be able to save state in local storage', () => {
		expect(
			saveState(TOKEN_SESSION_KEY, 'ASHJHWH82J2GWS92'),
			'react-typescript-boilerplate_0.1.1_TOKEN -> ASHJHWH82J2GWS92',
		).to.equal(true);
		expect(saveState(LATITUDE, '79', true), 'LATITUDE -> 79').to.equal(true);
	});

	it('should be able to load state from local storage', () => {
		saveState(TOKEN_SESSION_KEY, 'ASHJHWH82J2GWS92');
		expect(loadState(TOKEN_SESSION_KEY), 'should return ASHJHWH82J2GWS92').to.equal('ASHJHWH82J2GWS92');
		expect(loadState(TOKEN_SESSION_KEY, true), 'should return null').to.equal(null);
	});

	it('should be able to remove state from local storage', () => {
		removeState(TOKEN_SESSION_KEY);
		removeState(LATITUDE, true);
		removeState([TOKEN_SESSION_KEY, LATITUDE], true);
		removeState([TOKEN_SESSION_KEY, LATITUDE]);
	});
});
