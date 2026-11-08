import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const serviceListSlice = createSlice({
  name: 'serviceList',
  initialState,
  reducers: {
    fetchListRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchListSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload;
    },
    fetchListFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchListRequest, fetchListSuccess, fetchListFailure } = serviceListSlice.actions;
export default serviceListSlice.reducer;
