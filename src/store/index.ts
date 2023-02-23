import { configureStore, Reducer, combineReducers, Slice } from '@reduxjs/toolkit';

import SampleSlice from 'slices/UserInfoSlice';
import LoaderSlice from 'slices/LoaderSlice';

interface ISimpleMap {
	[field: string]: Reducer;
}
const reducerMap: ISimpleMap = {
	[LoaderSlice.name]: LoaderSlice.reducer,
	[SampleSlice.name]: SampleSlice.reducer,
};

const store = configureStore({
	reducer: combineReducers(reducerMap),
});

export const registerSlice = (slice: Slice): void => {
	reducerMap[slice.name] = slice.reducer;
	store.replaceReducer(combineReducers(reducerMap));
};

export default store;
