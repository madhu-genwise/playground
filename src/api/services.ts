import { Get } from 'api';

import Constants from './constants';

import { IUserInfoResponse } from 'types';
import { setUserInfoData } from 'slices/UserInfoSlice';

export const UserInfoAPI = async (): Promise<IUserInfoResponse> =>
	Get<IUserInfoResponse>(Constants.userInfo, setUserInfoData);
