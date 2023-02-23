import React from 'react';
import { ToastOptions, toast } from 'react-toastify';

import './Toasty.scss';

interface Props {
	message: string;
}

const ToastMessage: React.FC<Props> = ({ message }) => {
	return <div>{message}</div>;
};

export default {
	error: (message: string, options?: ToastOptions): React.ReactText =>
		toast.error(<ToastMessage message={message} />, options),
	info: (message: string, options?: ToastOptions): React.ReactText =>
		toast.info(<ToastMessage message={message} />, options),
	success: (message: string, options?: ToastOptions): React.ReactText =>
		toast.success(<ToastMessage message={message} />, options),
};
