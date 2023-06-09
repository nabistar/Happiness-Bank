import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface info {
    [key: string]: string | number;
}

interface initialState {
    data: info | info[] | null;
    file: info | null;
    loading: boolean;
    error: unknown;
}

export const getDaily = createAsyncThunk<info, info, { rejectValue: Error }>("dailySlice/getDaily", async (payload, { rejectWithValue }) => {
    let result: info = {};

    try {
        if (payload) {
            const response = await axios.get("/daily", {
                params: {
                    user_id: payload.user_id,
                    month: payload.month,
                },
            });
            result = response.data.data;
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            return rejectWithValue(err.response?.data);
        }
    }

    return result;
});

export const getItem = createAsyncThunk<info, info, { rejectValue: Error }>("dailySlice/getItem", async (payload, { rejectWithValue }) => {
    let result: info = {};

    try {
        const response = await axios.get(`/daily/${payload.id}`);
        result = response.data.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            return rejectWithValue(err.response?.data);
        }
    }

    return result;
});

export const addItem = createAsyncThunk<info, info, { rejectValue: Error }>("dailySlice/addItem", async (payload, { rejectWithValue }) => {
    let result: info = {};

    try {
        const response = await axios.post("/daily", payload);
        result = response.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            return rejectWithValue(err.response?.data);
        }
    }

    return result;
});

export const addImg = createAsyncThunk<info, FormData, { rejectValue: Error }>("dailySlice/addImg", async (payload, { rejectWithValue }) => {
    let result: info = {};

    try {
        const response = await axios.post("/dailyimg", payload, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        result = response.data.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            return rejectWithValue(err.response?.data);
        }
    }

    return result;
});

export const putItem = createAsyncThunk<info, info, { rejectValue: Error }>("dailySlice/putItem", async (payload, { rejectWithValue }) => {
    let result: info = {};

    try {
        const response = await axios.put(`/daily/${payload.id}`, payload);
        result = response.data.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            return rejectWithValue(err.response?.data);
        }
    }

    return result;
});

export const putSticker = createAsyncThunk<info, info, { rejectValue: Error }>("dailySlice/putSticker", async (payload, { rejectWithValue }) => {
    let result: info = {};

    try {
        const response = await axios.put(`/daily/sticker/${payload.id}`, payload);
        result = response.data.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            return rejectWithValue(err.response?.data);
        }
    }

    return result;
});

export const deleteItem = createAsyncThunk<info, info, { rejectValue: Error }>("dailySlice/deleteItem", async (payload, { rejectWithValue }) => {
    let result: info = {};

    try {
        const response = await axios.delete(`/daily/${payload.id}`);
        result = response.data.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            return rejectWithValue(err.response?.data);
        }
    }

    return result;
});

const dailySlice = createSlice({
    name: "dailySlice",
    initialState: {
        data: null,
        file: null,
        loading: false,
        error: null,
    } as initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDaily.pending, (state, { payload }) => {
                state.loading = true;
            })
            .addCase(getDaily.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.data = payload;
                state.file = null;
            })
            .addCase(getDaily.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })
            .addCase(getItem.pending, (state, { payload }) => {
                state.loading = true;
            })
            .addCase(getItem.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.data = payload;
            })
            .addCase(getItem.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })
            .addCase(addItem.pending, (state, { payload }) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addItem.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.data = payload;
            })
            .addCase(addItem.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })
            .addCase(addImg.pending, (state, { payload }) => {
                state.loading = true;
            })
            .addCase(addImg.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.file = payload;
            })
            .addCase(addImg.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })
            .addCase(putItem.pending, (state, { payload }) => {
                state.loading = true;
            })
            .addCase(putItem.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.data = payload;
            })
            .addCase(putItem.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })
            .addCase(putSticker.pending, (state, { payload }) => {
                state.loading = true;
            })
            .addCase(putSticker.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.data = payload;
            })
            .addCase(putSticker.rejected, (state, { payload }) => {
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

export default dailySlice.reducer;
