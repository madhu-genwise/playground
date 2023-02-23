import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import { Slide, ToastContainer, toast } from 'react-toastify';

const ToastWrap = () => (
	<ToastContainer
		position={toast.POSITION.TOP_CENTER}
		autoClose={5000}
		hideProgressBar
		closeButton={false}
		transition={Slide}
		draggable={false}
		pauseOnFocusLoss={false}
		closeOnClick={false}
		className="toaster"
		toastStyle={{
			margin: 0,
			borderRadius: 0,
			padding: '15px',
		}}
	/>
);

export default React.memo(ToastWrap);
