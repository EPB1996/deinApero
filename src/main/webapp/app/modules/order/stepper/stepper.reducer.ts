import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  maxstep: 3,
  activeStep: 1,
  finished: false,
};

export type OrderStepState = typeof initialState;

export const OrderStepperSlice = createSlice({
  name: 'stepper',
  initialState,
  reducers: {
    nextStep(state) {
      if (state.activeStep !== state.maxstep) {
        (state.activeStep += 1), (state.finished = state.activeStep === state.maxstep);
      }
    },
    previousStep(state) {
      if (state.activeStep !== 0) {
        (state.activeStep -= 1), (state.finished = state.activeStep === state.maxstep);
      }
    },
    setStep(state, data) {
      state.activeStep = data.payload;
    },
  },
});

export const { nextStep, previousStep, setStep } = OrderStepperSlice.actions;
export default OrderStepperSlice.reducer;
