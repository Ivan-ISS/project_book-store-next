import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IBookData } from '@/types/typeBook';

export const fetchBooks = createAsyncThunk(
    'books/fetchBooks',
    async (subject/* , page  */: string) => {
        const response = await fetch(`api/books?subject=${subject}`);
        const data = await response.json();
        console.log(data.booksData[0]);
        return data.booksData;
    }
);

const booksSlice = createSlice({
    name: 'books',
    initialState: {
        booksData: [] as IBookData[],
        currentCategory: '',
        status: '',
        currentPage: 0,
    },
    reducers: {
        setBooksData(state, action: PayloadAction<IBookData[]>) {
            state.booksData = action.payload;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
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
                state.currentPage += 1;
            })
            .addCase(fetchBooks.rejected, (state, action ) => {
                state.status = 'download failed';
            });
    }
});

export default booksSlice.reducer;
export const { setBooksData, setCurrentPage, setCurrentCategory } = booksSlice.actions;