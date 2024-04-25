import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IBookData, IBookDataInBag } from '@/types/typeBook';

export interface fetchBookParams {
    email: string;
    password: string;
}

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }: fetchBookParams) => {
        const response = await fetch('api/auth?', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        const data = await response.json();
        console.log(data);
        // dispatch(fetchBooks(data.token));
        return data.token;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        email: null as string | null,
        password: null as string | null,
        token: null as string | null,
        error: null as string | null | undefined,
        bag: [] as IBookDataInBag[],
        aboutUser: null as string | null,
        status: '' as string,
    },
    reducers: {
        setDataUser(state, action: PayloadAction<{ [key: string]: string }>) {
            state.email = action.payload.email;
            state.password = action.payload.password;
        },
        addToBag(state, action: PayloadAction<IBookData>) {
            const book = { ...action.payload, quantity: 1 };
            state.bag.push(book);
        },
        setQuantity(state, action: PayloadAction<{id: string, quantity: number}>) {
            const { id, quantity } = action.payload;
            const bookIndex = state.bag.findIndex((book) => book.id === id);
            
            if (bookIndex !== -1) {
                if (!quantity) {
                    state.bag.splice(bookIndex, 1);
                } else {
                    state.bag[bookIndex].quantity = quantity;
                }
            }
        },
        signOut(state) {
            state.token = null;
            state.bag = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'in progress';
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<string>) => {
                state.status = 'successfully';
                state.error = null;
                state.token = action.payload;
                console.log('payload ', action.payload);
                console.log('status ', state.status);
            })
            .addCase(loginUser.rejected, (state, action ) => {
                state.status = 'download failed';
                state.error = action.error.message;
                console.log('error ', state.error);
                console.log('status ', state.status);
            });
    }
});

export default authSlice.reducer;
export const { signOut, setDataUser, addToBag, setQuantity } = authSlice.actions;