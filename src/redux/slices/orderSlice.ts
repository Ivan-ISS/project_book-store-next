import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IBookDataInBag } from '@/types/typeBook';

export interface fetchOrderParams {
    email: string;
    bag: IBookDataInBag[];
}

export const fetchOrder = createAsyncThunk(
    'order',
    async ({ email, bag }: fetchOrderParams) => {
        const response = await fetch('api/order?', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, bag }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        const data = await response.json();
        return data.message;
    }
);

const orderSlice = createSlice({
    name: 'auth',
    initialState: {
        message: null as string | null,
        error: null as string | null | undefined,
        status: '' as string,
    },
    reducers: { },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrder.pending, (state) => {
                state.status = 'in progress';
            })
            .addCase(fetchOrder.fulfilled, (state, action: PayloadAction<string>) => {
                state.status = 'successfully';
                state.error = null;
                state.message = action.payload;
            })
            .addCase(fetchOrder.rejected, (state, action ) => {
                state.status = 'download failed';
                state.error = action.error.message;
            });
    }
});

export default orderSlice.reducer;
export const {  } = orderSlice.actions;