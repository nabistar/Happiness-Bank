import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface info {
    [key: string]: string | number;
}

interface initialState {
    data: info | info[] | null;
	check: boolean;
    loading: boolean;
    error: unknown;
}

export const loginCheck = createAsyncThunk<boolean, info, {rejectValue: Error}>("userSlice/loginCheck", async (payload, { rejectWithValue }) => {
    let result: boolean = false;

    try {
        const response = await axios.get("/user/logincheck");
        result = response.data.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            return rejectWithValue(err.response?.data);
        }
    }

    return result;
});

export const logOut = createAsyncThunk<info, info, {rejectValue: Error}>("userSlice/logOut", async (payload, { rejectWithValue }) => {
    let result: info = {};

    try {
        const response = await axios.get("/user/logout");
        result = response.data.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            return rejectWithValue(err.response?.data);
        }
    }

    return result;
});

export const logIn = createAsyncThunk<info, info, {rejectValue: Error}>("userSlice/logIn", async (payload, { rejectWithValue }) => {
    let result: info = {};

    try {
        const response = await axios.post("/user/login", payload);
        result = response.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            return rejectWithValue(err.response?.data);
        }
    }

    return result;
});

export const addItem = createAsyncThunk<info[], info, {rejectValue: Error}>("userSlice/addItem", async (payload, { rejectWithValue }) => {
    let result = [];

    try {
        const response = await axios.post("/user", payload);
        result = response.data.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            return rejectWithValue(err.response?.data);
        }
    }

    return result;
});

export const deleteItem = createAsyncThunk<info, info, {rejectValue: Error}>("userSlice/deleteItem", async (payload, { rejectWithValue }) => {
    let result: info = {};

    try {
        const response = await axios.delete(`/user${payload.id}`);
        result = response.data.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            return rejectWithValue(err.response?.data);
        }
    }

    return result;
});

const userSlice = createSlice({
    name: "userSlice",
    initialState: {
        data: null,
		check: false,
        loading: false,
        error: null,
    } as initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginCheck.pending, (state, { payload }) => {
                state.loading = true;
            })
            .addCase(loginCheck.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.check = payload;
            })
            .addCase(loginCheck.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })
            .addCase(logOut.pending, (state, { payload }) => {
                state.loading = true;
            })
            .addCase(logOut.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.data = payload;
            })
            .addCase(logOut.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })
            .addCase(logIn.pending, (state, { payload }) => {
                state.loading = true;
				state.error = null;
            })
            .addCase(logIn.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.data = payload;
            })
            .addCase(logIn.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })
            .addCase(addItem.pending, (state, { payload }) => {
                state.loading = true;
            })
            .addCase(addItem.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.data = payload;
            })
            .addCase(addItem.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })
            .addCase(deleteItem.pending, (state, { payload }) => {
                state.loading = true;
            })
            .addCase(deleteItem.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.data = payload;
            })
            .addCase(deleteItem.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });
    },
});

export default userSlice.reducer;
