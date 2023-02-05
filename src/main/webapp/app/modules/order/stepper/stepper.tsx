import './stepper.scss';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import React, { useEffect, useState } from 'react';
import { Slide } from 'react-awesome-reveal';
import { Step, Stepper } from 'react-form-stepper';

import { Button, Col, Row } from 'reactstrap';
import CustomerInfo from '../overview/customerInfo/customerInfo';

import ProductSelection from '../productSelection/productSelection';
import { nextStep, setStep } from './stepper.reducer';

import OverviewSidebar from '../overview/sidebar/overviewSidebar';
import Guests from '../guests/guests';

const OrderStepper = () => {
  const dispatch = useAppDispatch();
  const { activeStep, showSideBar, overViewExpand } = useAppSelector(state => state.orderStepper);

  const handleNext = () => {
    dispatch(nextStep());
  };

  const handleSetStep = (step: number) => {
    dispatch(setStep(step));
  };

  const renderStep = param => {
    switch (param) {
      case 0:
        return <Guests></Guests>;
      case 1:
        return <ProductSelection></ProductSelection>;
      case 2:
        return <CustomerInfo></CustomerInfo>;
      default:
        return 'Something went wrong';
    }
  };

  return (
    <>
      <Slide direction="down" duration={1500} triggerOnce>
        <Stepper activeStep={activeStep}>
          <Step
            label="Guests"
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

      <Row>
        <Col className={overViewExpand ? 'side-by-side' : 'sidebar'}>{renderStep(activeStep)}</Col>
        {showSideBar && (
          <Col style={{ height: '100vh' }} className={overViewExpand && 'side-by-side'}>
            <Slide direction="right" duration={1500} triggerOnce>
              <OverviewSidebar></OverviewSidebar>
            </Slide>
          </Col>
        )}
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
