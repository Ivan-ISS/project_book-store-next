import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IBookData, IBookDataInBag } from '@/types/typeBook';
import { IUserData } from '@/types/typeUser';
import { userDataDefault } from '@/data';
import { saveUserData } from '@/utils/saveUserData';
import { loadUserState } from '@/utils/loadUserState';

export interface fetchAuthParams {
    email: string;
    password: string;
}

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }: fetchAuthParams) => {
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
        return data.token;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userData: userDataDefault as IUserData,
        token: null as string | null,
        error: null as string | null | undefined,
        bag: [] as IBookDataInBag[],
        status: '' as string,
    },
    reducers: {
        setDataUser(state, action: PayloadAction<{ [key: string]: string }>) {
            const { email, password, about, name } = action.payload;
            // state.userData = { ...state.userData, email, password};
            state.userData = {
                ...state.userData,
                ...(name && { name }),
                ...(email && { email }),
                ...(password && { password }),
                ...(about && { about }),
            };
        },
        addToBag(state, action: PayloadAction<IBookData>) {
            const book = { ...action.payload, quantity: 1 };
            state.bag.push(book);
        },
        setQuantity(state, action: PayloadAction<{id: string, quantity: number}>) {
            const { id, quantity } = action.payload;
            const bookIndex = state.bag.findIndex((book) => book.id === id);
            
            if (bookIndex !== -1) {
                if (quantity < 1) {
                    state.bag.splice(bookIndex, 1);
                } else {
                    state.bag[bookIndex].quantity = quantity;
                }
            }
        },
        signOut(state) {
            saveUserData(state.userData, state.bag);
            localStorage.setItem('users', JSON.stringify(state.userData));
            state.userData = userDataDefault;
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
                if (state.userData.email) {
                    const user = loadUserState(state.userData.email);
                    if (user) {
                        state.userData = user.userData;
                        state.bag = user.bag;
                    }
                }
            })
            .addCase(loginUser.rejected, (state, action ) => {
                state.status = 'download failed';
                state.error = action.error.message;
            });
    }
});

export default authSlice.reducer;
export const { signOut, setDataUser, addToBag, setQuantity } = authSlice.actions;