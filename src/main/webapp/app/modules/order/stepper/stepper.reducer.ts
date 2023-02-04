import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  maxstep: 3,
  activeStep: 0,
  showSideBar: false,
  overViewExpand: false,
  finished: false,
};

export type OrderStepState = typeof initialState;

const validateStep = (step: number, state) => {
  if (step === 0) {
    state.showSideBar = false;
    state.overViewExpand = false;
  }
  if (step === 1) {
    state.showSideBar = true;
    state.overViewExpand = false;
  }
  if (step === 2) {
    state.showSideBar = true;
    state.overViewExpand = true;
  }
};

export const OrderStepperSlice = createSlice({
  name: 'stepper',
  initialState,
  reducers: {
    nextStep(state) {
      validateStep(state.activeStep + 1, state);
      if (state.activeStep !== state.maxstep) {
        (state.activeStep += 1), (state.finished = state.activeStep === state.maxstep);
      }
    },
    setStep(state, data) {
      validateStep(data.payload, state);
      state.activeStep = data.payload;
    },
  },
});

export const { nextStep, setStep } = OrderStepperSlice.actions;
export default OrderStepperSlice.reducer;
