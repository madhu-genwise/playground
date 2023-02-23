import { useEffect, useState, useRef } from 'react';
import Axios, { CancelTokenSource } from 'axios';
import { IError } from 'types';

type ResultTuple<T> = [T | undefined, IError | null, boolean];

const useService = <A extends unknown[], T>(api: (...args: A) => Promise<T>, options: A): ResultTuple<T> => {
	const Source = useRef<CancelTokenSource>();
	const [data, setData] = useState<T>();
	const [error, setError] = useState<IError | null>(null);
	const [waiting, setWaiting] = useState<boolean>(true);

	if (!api || typeof api !== 'function') {
		const message = `API not valid!`;
		throw new Error(message);
	}

	const onData = (d: T) => {
		setWaiting(false);
		setError(null);
		setData(d);
		Source.current = undefined;
	};

	const onError = (err: IError) => {
		setWaiting(false);
		setError(err);
		Source.current = undefined;
	};

	const onChange = () => {
		if (Source.current) {
			Source.current.cancel();
		}
		Source.current = Axios.CancelToken.source();
		!waiting && setWaiting(true);
		(api as CallableFunction)(...options, Source.current.token)
			.then(onData)
			.catch(onError);
	};

	const onUnMount = () => {
		if (!Source.current) return;
		Source.current.cancel();
	};
	const onMount = () => onUnMount;
	useEffect(onMount, []);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(onChange, options);
	return [data, error, waiting];
};

export default useService;
