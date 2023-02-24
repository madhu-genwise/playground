import React, { useCallback } from 'react';

import { fetchUserInfoApi, useUserInfo } from 'slices/UserInfoSlice';
import { useDispatch } from 'react-redux';
import './Home.scss';
import nativeFunctions from 'utils/nativeHandshake';

const Home: React.FC = () => {
	const dispatch = useDispatch();
	const { username } = useUserInfo();

	const onAPICall = useCallback(() => {
		dispatch(fetchUserInfoApi());
	}, [dispatch]);

	const onAPICallFailure = useCallback(() => {
		dispatch(fetchUserInfoApi(true));
	}, [dispatch]);

	const showLoader = () => {
		nativeFunctions.showLoader({ message: 'Loading...' });
		setTimeout(() => {
			nativeFunctions.hideLoader();
		}, 5000);
	};

	const openCamera = async () => {
		const cam = await nativeFunctions.openCamera();
		console.log(cam);
	};

	return (
		<div className="homepage">
			<h1>{`Hello ${username ?? ''}!!`}</h1>
			<button onClick={onAPICall}>Call API success</button>
			<button onClick={onAPICallFailure}>Call User API Failure</button>
			<button onClick={showLoader}>Show Loader</button>
			<button onClick={openCamera}>Open Camera</button>
			<button onClick={() => nativeFunctions.shareViaWhatsapp('Hello dudes')}>Share Whatsapp</button>
			<button onClick={() => nativeFunctions.shareGenerally('Hello dudes')}>Share general</button>
			<button onClick={() => nativeFunctions.openURL('https://google.com')}>Open Url</button>
			<button onClick={() => nativeFunctions.openDeepLinkWithoutCallback('whatsapp://')}>Open Deeplink</button>
		</div>
	);
};

export default Home;
