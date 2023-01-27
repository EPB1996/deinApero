import './order.scss';
import React, { useState } from 'react';
import { CustomerInfo } from './customerInfo/customerInfo';
import OrderStepper from './stepper/stepper';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import PackageSelection from './packageSelection/packageSelection';
import ProductSelection from './productSelection/productSelection';
import { Button } from 'reactstrap';
import { nextStep } from './stepper/stepper.reducer';

const Order = () => {
  return <OrderStepper></OrderStepper>;
};

export default Order;
