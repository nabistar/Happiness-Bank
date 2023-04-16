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

export const getList = createAsyncThunk<info, info, { rejectValue: Error }>("stickerSlice/getList", async (payload, { rejectWithValue }) => {
    let result: info = {};

    try {
        if (payload) {
            const response = await axios.get("/sticker", {
                params: {
                    user_id: payload.user_id
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

export const addItem = createAsyncThunk<info, info, { rejectValue: Error }>("stickerSlice/addItem", async (payload, { rejectWithValue }) => {
    let result: info = {};

    try {
        const response = await axios.post("/sticker", payload);
        result = response.data.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            return rejectWithValue(err.response?.data);
        }
    }

    return result;
});

export const addImg = createAsyncThunk<info, FormData, { rejectValue: Error }>("stickerSlice/addImg", async (payload, { rejectWithValue }) => {
    let result: info = {};

    try {
        const response = await axios.post("/stickerimg", payload, {
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

export const deleteItem = createAsyncThunk<info, info, { rejectValue: Error }>("stickerSlice/deleteItem", async (payload, { rejectWithValue }) => {
    let result: info = {};

    try {
        const response = await axios.delete(`/sticker/${payload.id}`);
        result = response.data.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            return rejectWithValue(err.response?.data);
        }
    }

    return result;
});

const stickerSlice = createSlice({
    name: "stickerSlice",
    initialState: {
        data: null,
        loading: false,
        error: null,
    } as initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getList.pending, (state, { payload }) => {
                state.loading = true;
            })
            .addCase(getList.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.data = payload;
            })
            .addCase(getList.rejected, (state, { payload }) => {
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
                state.data = payload;
            })
            .addCase(addImg.rejected, (state, { payload }) => {
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

export default stickerSlice.reducer;
