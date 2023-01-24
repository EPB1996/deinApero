import product from 'app/entities/product/product.reducer';
import productCategory from 'app/entities/product-category/product-category.reducer';
import customer from 'app/entities/customer/customer.reducer';
import order from 'app/entities/order/order.reducer';
import packageType from 'app/entities/package-type/package-type.reducer';
import packageTemplate from 'app/entities/package-template/package-template.reducer';
import orderItem from 'app/entities/order-item/order-item.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  product,
  productCategory,
  customer,
  order,
  packageType,
  packageTemplate,
  orderItem,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
