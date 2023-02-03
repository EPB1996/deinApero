import './stepper.scss';
import getStore, { useAppDispatch, useAppSelector } from 'app/config/store';
import React, { useEffect, useState } from 'react';
import { Slide } from 'react-awesome-reveal';
import { Step, Stepper } from 'react-form-stepper';
import { toast } from 'react-toastify';
import { Button, Col, Row } from 'reactstrap';
import CustomerInfo from '../customerInfo/customerInfo';
import PackageSelection from '../packageSelection/packageSelection';
import ProductSelection from '../productSelection/productSelection';
import { nextStep, setStep } from './stepper.reducer';
import Overview from '../overview/overview';
import OverviewSidebar from '../overview/sidebar/overviewSidebar';

const OrderStepper = () => {
  const dispatch = useAppDispatch();
  const activeStep = useAppSelector(state => state.orderStepper.activeStep);

  const validSelection = (step: number) => {
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
        return <ProductSelection></ProductSelection>;
      case 2:
        return <Overview></Overview>;
      default:
        return 'Something went wrong';
    }
  };

  return (
    <>
      <Slide direction="down" duration={1000}>
        <Stepper activeStep={activeStep}>
          <Step
            label="Contact Information"
            onClick={() => {
              handleSetStep(0);
            }}
          />
          <Step
            label="Product Selection"
            onClick={() => {
              handleSetStep(1);
            }}
          />
          <Step
            label="Overview"
            onClick={() => {
              handleSetStep(2);
            }}
          />
        </Stepper>
      </Slide>
      <div style={{ height: '15px' }}></div>

      <Row>
        <Col md={10}>{renderStep(activeStep)}</Col>
        <Col md={2}>
          <OverviewSidebar></OverviewSidebar>
        </Col>
      </Row>

      <Slide className="nextButtonContainer" direction="up" duration={1500} triggerOnce>
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
