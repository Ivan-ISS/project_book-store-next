import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchBooks = createAsyncThunk(
    'books/fetchBooks',
    async (subject/* , page  */: string) => {
        const reponse = await fetch(`api/books?subject=${subject}`);
        const data = await reponse.json();
        console.log(data.data[0]);
        return data;
    }
);

const booksSlice = createSlice({
    name: 'books',
    initialState: {
        books: [] as any,
        currentCategory: '',
        status: '',
        currentPage: 0,
    },
    reducers: {
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
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.status = 'successfully';
                /* console.log(action.payload);
                state.books = [...state.books, ...action.payload]; */
                state.currentPage += 1;
            })
            .addCase(fetchBooks.rejected, (state, action ) => {
                state.status = 'download failed';
            });
    }
});

export default booksSlice.reducer;
export const { setCurrentPage, setCurrentCategory } = booksSlice.actions;