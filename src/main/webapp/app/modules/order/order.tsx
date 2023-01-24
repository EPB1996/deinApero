import React, { useState } from 'react';
import { CustomerInfo } from './customerInfo/customerInfo';
import OrderStepper from './stepper/stepper';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import PackageSelection from './packageSelection/packageSelection';
import ProductSelection from './productSelection/productSelection';

const Order = () => {
  const activeStep = useAppSelector(state => state.orderStepper.activeStep);
  const dispatch = useAppDispatch();

  const renderStep = param => {
    switch (param) {
      case 0:
        return <CustomerInfo></CustomerInfo>;
      case 1:
        return <PackageSelection></PackageSelection>;
      case 2:
        return <ProductSelection></ProductSelection>;
      default:
        return 'Something went wrong';
    }
  };

  return (
    <>
      <OrderStepper></OrderStepper>
      {renderStep(activeStep)}
    </>
  );
};

export default Order;
