export const isProd = (): boolean => process.env.NODE_ENV === 'production';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getURLParameter = (qrString: string, paramName: string) => {
	const qr = qrString.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
	const regex = new RegExp(`[\\?&]${paramName}=([^&#]*)`);
	const results = regex.exec(qr);

	return results && results.length > 0 ? decodeURIComponent(results[1].replace(/\+/g, ' ')) : '';
};
