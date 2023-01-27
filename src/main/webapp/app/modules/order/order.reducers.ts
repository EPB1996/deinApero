import customerInfo from './customerInfo/customerInfo.reducer';
import orderStepper from './stepper/stepper.reducer';
import products from './productSelection/product/product.reducer';
import packageReducer from './packageSelection/package/package.reducer';
const orderReducer = {
  customerInfo,
  orderStepper,
  packageReducer,
  products,
};
export default orderReducer;
