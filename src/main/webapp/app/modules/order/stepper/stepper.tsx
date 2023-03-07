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
import Login from 'app/modules/login/login';
import { translate } from 'react-jhipster';
import DateSelection from '../dateSelection/dateSelection';

const OrderStepper = () => {
  const dispatch = useAppDispatch();
  const { activeStep, showSideBar, overViewExpand, finished } = useAppSelector(state => state.orderStepper);
  const account = useAppSelector(state => state.authentication.account);

  const handleNext = () => {
    if (!finished) dispatch(nextStep());
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
        return <DateSelection></DateSelection>;
      case 2:
        return <ProductSelection></ProductSelection>;
      case 3:
        return <CustomerInfo></CustomerInfo>;
      default:
        return 'Something went wrong';
    }
  };

  return (
    <Container style={{ overflow: 'hidden', height: '100%' }}>
      <Row style={{ height: '20%', alignItems: 'center', justifyItems: 'center' }}>
        <Col md={{ size: 2, order: 1 }} sm={{ size: 2, order: 1 }} xs={{ size: 6, order: 2 }}>
          <div
            style={{ display: 'flex', justifyContent: 'center' }}
            onClick={() => {
              handlePrevious();
            }}
          >
            <LeftArrow></LeftArrow>
          </div>
        </Col>
        <Col md={{ size: 8, order: 2 }} sm={{ size: 8, order: 2 }} xs={{ size: 12, order: 1 }}>
          <Slide style={{ flexGrow: 7 }} direction="down" duration={1500} triggerOnce cascade>
            <Stepper activeStep={activeStep}>
              <Step
                label={translate('custom.stepper.guestLabel')}
                onClick={() => {
                  handleSetStep(0);
                }}
              />
              <Step
                label={translate('custom.stepper.dateSelectionLabel')}
                onClick={() => {
                  handleSetStep(1);
                }}
              />
              <Step
                label={translate('custom.stepper.productSelectionLabel')}
                onClick={() => {
                  handleSetStep(2);
                }}
              />
              <Step
                label={translate('custom.stepper.overviewLabel')}
                onClick={() => {
                  handleSetStep(3);
                }}
              />
            </Stepper>
          </Slide>
        </Col>
        <Col md={{ size: 2, order: 3 }} sm={{ size: 2, order: 3 }} xs={{ size: 6, order: 3 }}>
          <div
            style={{ display: 'flex', justifyContent: 'center' }}
            onClick={() => {
              handleNext();
            }}
          >
            <RightArrow></RightArrow>
          </div>
        </Col>
      </Row>
      <Row style={{ height: '80%' }}>
        <Col style={{ height: '100%', paddingBottom: '10px' }} className={overViewExpand ? 'side-by-side' : 'sidebar'}>
          {renderStep(activeStep)}
        </Col>
        {/* {showSideBar && (
          <Col style={{ height: '100%', paddingBottom: '10px' }} className={overViewExpand ? 'side-by-side' : ''}>
            <Slide className="h-100" direction="right" duration={1500} triggerOnce>
              <OverviewSidebar overViewExpand={overViewExpand}></OverviewSidebar>
            </Slide>
          </Col>
        )} */}
      </Row>
    </Container>
  );
};

export default OrderStepper;
