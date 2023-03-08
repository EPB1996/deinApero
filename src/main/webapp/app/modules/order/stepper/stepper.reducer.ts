import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  maxstep: 8,
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
    state.showSideBar = false;
    state.overViewExpand = false;
  }
  if (step === 2) {
    state.showSideBar = false;
    state.overViewExpand = false;
  }
  if (step === 3) {
    state.showSideBar = false;
    state.overViewExpand = false;
  }
  if (step === 4) {
    state.showSideBar = false;
    state.overViewExpand = false;
  }
  if (step === 5) {
    state.showSideBar = false;
    state.overViewExpand = false;
  }
  if (step === 6) {
    state.showSideBar = false;
    state.overViewExpand = false;
  }
  if (step === 7) {
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
        (state.activeStep += 1), (state.finished = state.activeStep + 1 === state.maxstep);
      }
    },
    previousStep(state) {
      validateStep(state.activeStep - 1, state);
      if (state.activeStep !== 0) {
        (state.activeStep -= 1), (state.finished = state.activeStep - 1 === state.maxstep);
      }
    },
    setStep(state, data) {
      validateStep(data.payload, state);
      state.activeStep = data.payload;
      state.finished = data.payload === state.maxstep;
    },
    reset() {
      return initialState;
    },
  },
});

export const { nextStep, setStep, previousStep, reset } = OrderStepperSlice.actions;
export default OrderStepperSlice.reducer;
