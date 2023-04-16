import { configureStore } from '@reduxjs/toolkit';

// 슬라이스
import userSlice from './Slice/userSlice';
import dailySlice from './Slice/dailySlice';
import stickerSlice from './Slice/stickerSlice';


const store = configureStore({
	reducer: {
		userSlice: userSlice,
		dailySlice: dailySlice,
		stickerSlice: stickerSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;