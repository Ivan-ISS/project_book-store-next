import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchBooks = createAsyncThunk(
    'books/fetchBooks',
    async (/* { subject, page } */) => {
        const reponse = await fetch(`api/books?subject=${'business'}`);
        const data = await reponse.json();
        console.log(data.data[0]);
        return data;
    }
);

/* export const fetchBooks = createAsyncThunk(
    'books/fetchBooks',
    async () => {
      const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=Subject:drama&&page=0');
      const data = await response.json();
      console.log('here ', data.items[0]);
      return data.items;
    }
  ); */

const booksSlice = createSlice({
    name: 'books',
    initialState: {
        books: [] as any,
        status: '',
        currentPage: 0,
    },
    reducers: {
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
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
export const { setCurrentPage } = booksSlice.actions;