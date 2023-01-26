import customerInfo from './customerInfo/customerInfo.reducer';
import orderStepper from './stepper/stepper.reducer';
import products from './productSelection/product/product.reducer';
const orderReducer = {
  customerInfo,
  orderStepper,
  products,
};
export default orderReducer;
