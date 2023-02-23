import React from 'react';

import { useLoader } from 'slices/LoaderSlice';
import Loader from '../Loader';

const GlobalLoader: React.FC = () => {
	const loading = useLoader();

	return <Loader loading={loading} />;
};

export default GlobalLoader;
