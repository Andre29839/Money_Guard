import { createSlice } from '@reduxjs/toolkit';
import {
  addTransactionsThunk,
  deleteTransactionsThunk,
  getTransactionCategoriesThunk,
  getTransactionsStatisticThunk,
  getTransactionsThunk,
  patchTransactionsThunk,
} from './transactionsThunks';

const initialState = {
  transactions: [],
  summary: [],
  categories: [
    'Main expenses',
    'Products',
    'Car',
    'Self care',
    'Child care',
    'Household products',
    'Education',
    'Leisure',
    'Other expenses',
    'Entertainment',
  ],
  isLoading: false,
  error: null,
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  extraReducers: builder =>
    builder
      //----------------------------- Get transactions currency ------------------------------
      .addCase(getTransactionsStatisticThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTransactionsStatisticThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.summary = action.payload;
      })
      .addCase(getTransactionsStatisticThunk.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error;
      })
      //----------------------------- Get transactions categories -----------------------------
      .addCase(getTransactionCategoriesThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTransactionCategoriesThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(getTransactionCategoriesThunk.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error;
      })
      //----------------------------- Get transactions -----------------------------
      .addCase(getTransactionsThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTransactionsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = action.payload;
      })
      .addCase(getTransactionsThunk.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error;
      })
      //----------------------------- Add transaction -----------------------------
      .addCase(addTransactionsThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addTransactionsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions.unshift(action.payload);
      })
      .addCase(addTransactionsThunk.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error;
      })
      //----------------------------- Refresh transaction  -----------------------------
      .addCase(patchTransactionsThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(patchTransactionsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.transactions.findIndex(
          t => t.id === action.payload.id
        );
        state.transactions[index] = action.payload;
      })
      .addCase(patchTransactionsThunk.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error;
      })
      //----------------------------- Delete transaction  -----------------------------
      .addCase(deleteTransactionsThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteTransactionsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = state.transactions.filter(
          transaction => transaction.id !== action.payload.id
        );
      })
      .addCase(deleteTransactionsThunk.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error;
      }),
});

export const transactionsReducer = transactionsSlice.reducer;
