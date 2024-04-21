import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { defaultCategory, defStartIndex } from '@/data';
import { IBookData } from '@/types/typeBook';

export interface fetchBookParams {
    subject: string;
    startIndex: number
}

export const fetchBooks = createAsyncThunk(
    'books/fetchBooks',
    async ({ subject, startIndex }: fetchBookParams) => {
        const response = await fetch(`api/books?subject=${subject}&startIndex=${startIndex}`);
        const data = await response.json();
        // console.log(data.booksData[0]);
        return data.booksData;
    }
);

const booksSlice = createSlice({
    name: 'books',
    initialState: {
        booksData: [] as IBookData[],
        currentCategory: defaultCategory.nameCategory,
        startIndex: defStartIndex,
        status: '',
    },
    reducers: {
        setBooksData(state, action: PayloadAction<IBookData[]>) {
            state.booksData = action.payload;
        },
        setStartIndex(state, action) {
            state.startIndex = action.payload;
        },
        setCurrentCategory(state, action) {
            state.currentCategory = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.status = 'in progress';
            })
            .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<IBookData[]>) => {
                state.status = 'successfully';
                console.log('Payload ', action.payload);
                state.booksData = [...state.booksData, ...action.payload];
            })
            .addCase(fetchBooks.rejected, (state, action ) => {
                state.status = 'download failed';
            });
    }
});

export default booksSlice.reducer;
export const { setBooksData, setStartIndex, setCurrentCategory } = booksSlice.actions;