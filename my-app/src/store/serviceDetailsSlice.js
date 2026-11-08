import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  item: null,
  loading: false,
  error: null,
};

const serviceDetailsSlice = createSlice({
  name: 'serviceDetails',
  initialState,
  reducers: {
    fetchDetailsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDetailsSuccess: (state, action) => {
      state.loading = false;
      state.item = action.payload;
    },
    fetchDetailsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchDetailsRequest, fetchDetailsSuccess, fetchDetailsFailure } = serviceDetailsSlice.actions;
export default serviceDetailsSlice.reducer;
