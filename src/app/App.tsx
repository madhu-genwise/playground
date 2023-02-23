import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { dispatchHideLoader, dispatchShowLoader } from 'slices/LoaderSlice';
import nativeHandshake from 'utils/nativeHandshake';

import Toaster from 'components/atoms/Toaster';
import Routes from 'routes';
import GlobalLoader from 'components/atoms/GlobalLoader';

const App: React.FC = () => {
	const dispatch = useDispatch();

	const [appInfoLoaded, setAppInfoLoaded] = useState(false);

	const showLoader = useCallback(() => dispatch(dispatchShowLoader()), [dispatch]);
	const hideLoader = useCallback(() => dispatch(dispatchHideLoader()), [dispatch]);

	const onLoad = useCallback(async () => {
		await nativeHandshake.initNativeHandshake();
		setAppInfoLoaded(true);
		hideLoader();
	}, [setAppInfoLoaded, hideLoader]);

	const getLoader = () => <GlobalLoader />;

	const getRouter = () => <Routes />;

	useEffect(() => {
		showLoader();
		onLoad();
	}, [onLoad, showLoader]);

	return (
		<div>
			{appInfoLoaded && getRouter()}
			{getLoader()}
			<Toaster />
		</div>
	);
};

export default App;
