import getStore, { useAppDispatch, useAppSelector } from 'app/config/store';
import React, { useEffect } from 'react';
import { Step, Stepper } from 'react-form-stepper';
import { setStep } from './stepper.reducer';

const OrderStepper = () => {
  const dispatch = useAppDispatch();
  const activeStep = useAppSelector(state => state.orderStepper.activeStep);

  return (
    <Stepper activeStep={activeStep}>
      <Step
        label="Children Step 1"
        onClick={() => {
          dispatch(setStep(0));
        }}
      />
      <Step
        label="Children Step 2"
        onClick={() => {
          dispatch(setStep(1));
        }}
      />
      <Step
        label="Children Step 3"
        onClick={() => {
          dispatch(setStep(2));
        }}
      />
    </Stepper>
  );
};

export default OrderStepper;
