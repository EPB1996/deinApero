import { useAppSelector } from 'app/config/store';
import React from 'react';
import { Zoom } from 'react-awesome-reveal';
import { Col, Row } from 'reactstrap';
import PackageItem from '../packageSelection/package/packageItem';
import ProductItem from '../productSelection/product/productItem';

const Overview = () => {
  const packageType = useAppSelector(state => state.packageReducer.packageType);
  const productsByCategory = useAppSelector(state => state.products);

  return (
    <Row>
      <Col>
        <PackageItem packageType={packageType}></PackageItem>
      </Col>
      <Col>
        {'Wein'}
        {productsByCategory.Wein.map((product, index) => (
          <Zoom key={index} duration={1500} direction={'up'}>
            {/*   <ProductItem product={product}></ProductItem> */}
            {product}
          </Zoom>
        ))}
        {'Kaviar'}
        {productsByCategory.Kaviar.map((product, index) => (
          <Zoom key={index} duration={1500} direction={'up'}>
            {/*    <ProductItem product={product}></ProductItem> */}
            {product}
          </Zoom>
        ))}
      </Col>
    </Row>
  );
};

export default Overview;
