/* eslint-disable @typescript-eslint/no-unused-vars */
import { useSelector } from 'react-redux';

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import Toasty from 'components/atoms/Toasty';

import { IUserInfoResponse } from 'types';
import { UserInfoAPI } from 'api';
import store from 'store';

export const UserInfoApi = createAsyncThunk('api/UserInfo', UserInfoAPI);

const INITIAL_STATE = () => ({
	loading: false,
	error: '',
	data: {},
});

interface IACTION<T = unknown> {
	type: string | symbol;
	payload: T;
}

interface IAPI_ACTION<T = unknown> extends IACTION<T> {
	meta: unknown;
	error: {
		name: string;
		message: string;
		stack: string;
	};
}

const setAPIError = (state: ReturnType<typeof INITIAL_STATE>, action: IAPI_ACTION) => {
	state.loading = false;
	state.error = action.error.message || 'Something went wrong';
	Toasty.error(state.error);
};

const UserInfoSlice = createSlice({
	name: 'UserInfo',
	initialState: INITIAL_STATE(),
	reducers: {
		CLEAR_ERROR: (state) => {
			state.error = '';
		},
		RESET: (state) => Object.assign(state, INITIAL_STATE()),
		setUserInfoData: (state = INITIAL_STATE(), action: PayloadAction<any>) => {
			return { ...action.payload };
		},
	},
	extraReducers: {
		[UserInfoApi.pending.toString()]: (state: ReturnType<typeof INITIAL_STATE>) => {
			state.data = {};
			state.loading = true;
		},
		[UserInfoApi.rejected.toString()]: setAPIError,
		[UserInfoApi.fulfilled.toString()]: (state, action: IAPI_ACTION<IUserInfoResponse>) => {
			state.loading = false;
			if (action.payload) {
				state.data = action.payload;
			}
		},
	},
});

export default UserInfoSlice;

export interface ISampleStates {
	[UserInfoSlice.name]: ReturnType<typeof UserInfoSlice.reducer>;
}

export const UserInfoSelector = (state: ISampleStates): any => {
	return state[UserInfoSlice.name].data || {};
};

export const useUserInfo = (): any => useSelector(UserInfoSelector);

export const fetchUserInfoApi =
	() =>
	async (dispatch: any): Promise<void> => {
		await dispatch(UserInfoApi());
		return;
	};

export const setUserInfoData = (action: any): void => {
	store.dispatch(UserInfoSlice.actions.setUserInfoData(action));
};
