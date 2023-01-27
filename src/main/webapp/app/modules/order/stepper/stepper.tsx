import './stepper.scss';
import getStore, { useAppDispatch, useAppSelector } from 'app/config/store';
import React, { useEffect, useState } from 'react';
import { Slide } from 'react-awesome-reveal';
import { Step, Stepper } from 'react-form-stepper';
import { toast } from 'react-toastify';
import { Button } from 'reactstrap';
import CustomerInfo from '../customerInfo/customerInfo';
import PackageSelection from '../packageSelection/packageSelection';
import ProductSelection from '../productSelection/productSelection';
import { nextStep, setStep } from './stepper.reducer';

const OrderStepper = () => {
  const dispatch = useAppDispatch();
  const activeStep = useAppSelector(state => state.orderStepper.activeStep);
  const packageType = useAppSelector(state => state.packageReducer.packageType);

  const [errorText, setErrorText] = useState('');

  const validSelection = (step: number) => {
    if (step === 2) {
      if (Object.keys(packageType).length === 0) {
        toast.error('Select Package.');
        return false;
      }
    }
    return true;
  };
  const handleNext = () => {
    if (!validSelection(activeStep + 1)) {
      return;
    }
    dispatch(nextStep());
  };

  const handleSetStep = (step: number) => {
    if (!validSelection(step)) {
      return;
    }
    dispatch(setStep(step));
  };

  const renderStep = param => {
    switch (param) {
      case 0:
        return <CustomerInfo></CustomerInfo>;
      case 1:
        return <PackageSelection></PackageSelection>;
      case 2:
        return <ProductSelection></ProductSelection>;
      case 3:
        return <>OverView Component</>;
      default:
        return 'Something went wrong';
    }
  };

  return (
    <>
      <Slide direction="down" duration={1000}>
        <Stepper style={{ height: '100px' }} activeStep={activeStep}>
          <Step
            label="Contact Information"
            onClick={() => {
              handleSetStep(0);
            }}
          />
          <Step
            label="Package Selection"
            onClick={() => {
              handleSetStep(1);
            }}
          />
          <Step
            label="Product Selection"
            onClick={() => {
              handleSetStep(2);
            }}
          />
          <Step
            label="Overview"
            onClick={() => {
              handleSetStep(3);
            }}
          />
        </Stepper>
      </Slide>
      <div style={{ height: '15px' }}></div>

      {renderStep(activeStep)}
      <Slide className="nextButtonContainer" direction="up" duration={1500}>
        <Button
          className="nextButton"
          onClick={() => {
            handleNext();
          }}
        >
          {'Next'}
        </Button>
      </Slide>
    </>
  );
};

export default OrderStepper;
