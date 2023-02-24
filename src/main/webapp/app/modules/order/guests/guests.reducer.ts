import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  numberOfGuests: 0,
};

export const GuestsSlice = createSlice({
  name: 'guests',
  initialState,
  reducers: {
    addNumberOfGuests(state, data) {
      state.numberOfGuests = data.payload.numberOfGuests;
    },
    reset() {
      return initialState;
    },
  },
});

export const { addNumberOfGuests, reset } = GuestsSlice.actions;

export default GuestsSlice.reducer;
