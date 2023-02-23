import React from 'react';
import PropTypes from 'prop-types';
import { LoaderProps } from './types';
import LoaderImage from '../../../assets/loader.gif';
import './Loader.scss';
import Typography from '../Typography';

const Loader: React.FC<LoaderProps> = ({ loading, fullscreen, loaderText }) => {
	const loaderContent = fullscreen ? (
		<div className="loader-container flex flex-center flex-justify-center flex-column">
			<div className="loader-content flex flex-justify-center flex-center">
				<img src={LoaderImage} alt="loader" className="loader white-background" />
			</div>
			{loaderText && (
				<div className="primary-background px2 py1 br1 mt3">
					<Typography variant="Regular200" className="light">
						{loaderText}
					</Typography>
				</div>
			)}
		</div>
	) : (
		<div className="loader-content flex flex-justify-center flex-center">
			<img src={LoaderImage} width={36} height={36} alt="loader" className="loader br9" />
		</div>
	);

	return loading ? loaderContent : null;
};

Loader.propTypes = {
	loading: PropTypes.bool,
	fullscreen: PropTypes.bool,
	loaderText: PropTypes.string,
};

Loader.defaultProps = {
	loading: false,
	fullscreen: true,
	loaderText: '',
};

export default Loader;
