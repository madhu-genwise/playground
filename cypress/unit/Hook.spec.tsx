/// <reference types="cypress" />

import { useState } from 'react';
import { mountHook } from 'cypress-react-unit-test';

import useService from '../../src/Hooks/useService';
import { CancelToken } from 'axios';

const GoodService = (): Promise<string> => Promise.resolve('Good Data');
const BadService = (): Promise<string> => Promise.reject('No Data');
const SlowService = (): Promise<string> => new Promise((resolve) => setTimeout(() => resolve('Good Data'), 10));

const CancelAble = (_id, cancelToken?: CancelToken): Promise<unknown> =>
	Promise.race([
		cancelToken.promise.then(() => Promise.reject('cancel')),
		new Promise((resolve) => setTimeout(() => resolve('data'), 30)),
	]);

describe('Service hook', () => {
	it('should return data', () => {
		mountHook(() => useService(GoodService, [])).then((result) => {
			const [data, error, loading] = result.current;
			expect(data).to.equal('Good Data');
			expect(loading).to.be.false;
			expect(error).to.equal(null);
		});
	});
	it('should return error', () => {
		mountHook(() => useService(BadService, [])).then((result) => {
			const [data, error, loading] = result.current;
			expect(data).to.be.undefined;
			expect(loading).to.be.false;
			expect(error).to.equal('No Data');
		});
	});

	it('should return data after some time', () => {
		mountHook(() => useService(SlowService, [])).then((result) => {
			cy.clock(null, ['setTimeout', 'clearTimeout']);
			const [data, error, loading] = result.current;
			expect(data).to.be.undefined;
			expect(loading).to.be.true;
			expect(error).to.equal(null);
			cy.tick(30);
			cy.wait(100).then(() => {
				const [data1, error1, loading1] = result.current;
				expect(data1).to.equal('Good Data');
				expect(loading1).to.be.false;
				expect(error1).to.equal(null);
				cy.clock().invoke('restore');
			});
		});
	});

	it('should throw an error', () => {
		const InvalidService = ('some invalid service' as unknown) as () => Promise<string>;
		mountHook(() => {
			try {
				return useService(InvalidService, []);
			} catch (e) {
				expect(e.message).to.equal('API not valid!');
			}
		});
	});

	it('should cancel previous call and send new one', () => {
		const useWrap = () => {
			const [id, setId] = useState<number>(1);
			const [data, error, loading] = useService(CancelAble, [id]);
			const next = () => setId((id) => id + 1);
			return { data, error, loading, next };
		};
		mountHook(() => useWrap()).then((result) => {
			const { next } = result.current;
			next();
			cy.wait(10).then(() => {
				const { error, data } = result.current;
				expect(error).to.equal('cancel');
				expect(data).to.be.undefined;
			});
			cy.wait(60).then(() => {
				const { error, data, loading } = result.current;
				expect(data).to.equal('data');
				expect(error).to.equal(null);
				expect(loading).to.be.false;
			});
		});
	});
});
