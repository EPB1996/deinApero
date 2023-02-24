import customerInfo from './overview/customerInfo/customerInfo.reducer';
import orderStepper from './stepper/stepper.reducer';
import products from './productSelection/product/product.reducer';
import guests from './guests/guests.reducer';
const orderReducer = {
  customerInfo,
  orderStepper,
  /* packageReducer, */
  products,
  guests,
};
export default orderReducer;
