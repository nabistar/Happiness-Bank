import { configureStore } from '@reduxjs/toolkit';

// 슬라이스
import userSlice from './Slice/userSlice';


const store = configureStore({
	reducer: {
		userSlice: userSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;