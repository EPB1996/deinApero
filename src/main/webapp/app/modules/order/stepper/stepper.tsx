import './stepper.scss';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import React, { useEffect, useState } from 'react';
import { Slide } from 'react-awesome-reveal';
import { Step, Stepper } from 'react-form-stepper';

import { Button, Col, Container, Row } from 'reactstrap';
import CustomerInfo from '../overview/customerInfo/customerInfo';

import ProductSelection from '../productSelection/productSelection';
import { nextStep, previousStep, setStep } from './stepper.reducer';

import OverviewSidebar from '../overview/sidebar/overviewSidebar';
import Guests from '../guests/guests';
import LeftArrow from './arrows/leftArrow';
import RightArrow from './arrows/rightArrow';

const OrderStepper = () => {
  const dispatch = useAppDispatch();
  const { activeStep, showSideBar, overViewExpand } = useAppSelector(state => state.orderStepper);

  const handleNext = () => {
    dispatch(nextStep());
  };

  const handlePrevious = () => {
    dispatch(previousStep());
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
    <Container style={{ overflow: 'hidden', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'baseline' }}>
        <div
          onClick={() => {
            handlePrevious();
          }}
        >
          <LeftArrow></LeftArrow>
        </div>
        <Slide style={{ flexGrow: 7 }} direction="down" duration={1500} triggerOnce cascade>
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
        <div
          onClick={() => {
            handleNext();
          }}
        >
          <RightArrow></RightArrow>
        </div>
      </div>
      <Row style={{ height: '100%' }}>
        <Col style={{ height: '100%' }} className={overViewExpand ? 'side-by-side' : 'sidebar'}>
          {renderStep(activeStep)}
        </Col>
        {showSideBar && (
          <Col style={{ height: '100%' }} className={overViewExpand && 'side-by-side'}>
            <Slide className="h-100" direction="right" duration={1500} triggerOnce>
              <OverviewSidebar></OverviewSidebar>
            </Slide>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default OrderStepper;
