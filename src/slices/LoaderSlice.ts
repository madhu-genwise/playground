import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { IDispatcherType } from 'types';

export const INITIAL_STATE = {
	loading: false,
};

const LoaderSlice = createSlice({
	name: 'loader',
	initialState: INITIAL_STATE,
	reducers: {
		showLoader() {
			return {
				loading: true,
			};
		},
		hideLoader() {
			return {
				loading: false,
			};
		},
	},
});

export const dispatchShowLoader =
	() =>
	async (dispatch: IDispatcherType): Promise<void> => {
		await dispatch(showLoader());
		return;
	};

export const dispatchHideLoader =
	() =>
	async (dispatch: IDispatcherType): Promise<void> => {
		await dispatch(hideLoader());
		return;
	};

export interface ISampleStates {
	[LoaderSlice.name]: ReturnType<typeof LoaderSlice.reducer>;
}

export const loaderSelector = (state: ISampleStates): boolean => {
	return state[LoaderSlice.name]?.loading || false;
};

export const useLoader = (): boolean => useSelector(loaderSelector);

export const { showLoader, hideLoader } = LoaderSlice.actions;
export default LoaderSlice;
