import './stepper.scss';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import React, { useEffect, useState } from 'react';
import { Slide } from 'react-awesome-reveal';
import { Step, Stepper } from 'react-form-stepper';
import { Col, Container, Row } from 'reactstrap';
import CustomerInfo from '../overview/customerInfo/customerInfo';
import ProductSelection from '../productSelection/productSelection';
import { nextStep, previousStep, setStep } from './stepper.reducer';
import OverviewSidebar from '../overview/sidebar/overviewSidebar';
import Guests from '../guests/guests';
import LeftArrow from './arrows/leftArrow';
import RightArrow from './arrows/rightArrow';
import { translate } from 'react-jhipster';
import DateSelection from '../dateSelection/dateSelection';

const OrderStepper = () => {
  const dispatch = useAppDispatch();
  const { activeStep, showSideBar, finished } = useAppSelector(state => state.orderStepper);
  const size = useWindowSize();

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
        return <ProductSelection categoryName={'Kaviar'}></ProductSelection>;
      case 3:
        return <ProductSelection categoryName={'Champagne'}></ProductSelection>;
      case 4:
        return <ProductSelection categoryName={'Austern'}></ProductSelection>;
      case 5:
        return <ProductSelection categoryName={'Platten'}></ProductSelection>;
      case 6:
        return <ProductSelection categoryName={'Vegetarisch'}></ProductSelection>;
      case 7:
        return <CustomerInfo></CustomerInfo>;
      default:
        return 'Something went wrong';
    }
  };

  return (
    <Container style={{ overflow: 'hidden', height: '100%' }}>
      <Row style={{ height: '20%', alignItems: 'center', justifyItems: 'center' }}>
        <Col md={{ size: 2, order: 1 }} sm={{ size: 6, order: 2 }} xs={{ size: 6, order: 2 }}>
          <div
            style={{ display: 'flex', justifyContent: 'center' }}
            onClick={() => {
              handlePrevious();
            }}
          >
            <LeftArrow></LeftArrow>
          </div>
        </Col>
        <Col md={{ size: 8, order: 2 }} sm={{ size: 12, order: 1 }} xs={{ size: 12, order: 1 }}>
          <Slide style={{ display: 'flex', justifyContent: 'center' }} direction="down" duration={1500} triggerOnce cascade>
            <Stepper style={{ padding: '0', width: '100%' }} activeStep={activeStep}>
              <Step
                label={size.width < 1000 ? '' : translate('custom.stepper.guestLabel')}
                onClick={() => {
                  handleSetStep(0);
                }}
              />
              <Step
                label={size.width < 1000 ? '' : translate('custom.stepper.dateSelectionLabel')}
                onClick={() => {
                  handleSetStep(1);
                }}
              />
              <Step
                label={size.width < 1000 ? '' : 'Kaviar'}
                onClick={() => {
                  handleSetStep(2);
                }}
              />
              <Step
                label={size.width < 1000 ? '' : 'Champagne'}
                onClick={() => {
                  handleSetStep(3);
                }}
              />
              <Step
                label={size.width < 1000 ? '' : 'Austern'}
                onClick={() => {
                  handleSetStep(4);
                }}
              />
              <Step
                label={size.width < 1000 ? '' : 'Platten'}
                onClick={() => {
                  handleSetStep(5);
                }}
              />
              <Step
                label={size.width < 1000 ? '' : 'Vegetarisch'}
                onClick={() => {
                  handleSetStep(6);
                }}
              />
              <Step
                label={size.width < 1000 ? '' : translate('custom.stepper.overviewLabel')}
                onClick={() => {
                  handleSetStep(7);
                }}
              />
            </Stepper>
          </Slide>
        </Col>
        <Col md={{ size: 2, order: 3 }} sm={{ size: 6, order: 3 }} xs={{ size: 6, order: 3 }}>
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
      <Row style={{ overflowY: 'auto', overflowX: 'hidden', height: '80%' }}>
        {showSideBar && (
          <Col style={{ height: '100%', paddingBottom: '10px' }} className={'side-by-side'}>
            <OverviewSidebar></OverviewSidebar>
          </Col>
        )}
        <Col style={{ height: '100%', paddingBottom: '10px' }} className={'side-by-side'}>
          {renderStep(activeStep)}
        </Col>
      </Row>
    </Container>
  );
};

const useWindowSize = () => {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== 'undefined') {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      // Add event listener
      window.addEventListener('resize', handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
};

export default OrderStepper;
