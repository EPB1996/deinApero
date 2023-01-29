import './overview.scss';
import { useAppSelector } from 'app/config/store';
import { IProductCategory } from 'app/shared/model/product-category.model';
import { IProduct } from 'app/shared/model/product.model';
import React from 'react';
import { Slide, Zoom } from 'react-awesome-reveal';
import { Card, CardBody, Col, ListGroup, ListGroupItem, Row } from 'reactstrap';
import PackageItem from '../packageSelection/package/packageItem';
import ProductItem from '../productSelection/product/productItem';
import OverviewProduct from './overviewItem/overviewProduct';
import Carousel from 'react-multi-carousel';
import CustomerInfo from '../customerInfo/customerInfo';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Overview = () => {
  const packageType = useAppSelector(state => state.packageReducer.packageType);
  const productsByCategory = useAppSelector(state => state.products);

  /* const productCategories = useAppSelector(state => state.productCategory.entities); */
  const productCategories = ['Wein', 'Kaviar'];

  return (
    <>
      <Row md={2} sm={1} xs={1}>
        <Slide direction="left" duration={1000}>
          <Col>
            <h2>Customer Information</h2>
            <Card>
              <CustomerInfo></CustomerInfo>
            </Card>
          </Col>
        </Slide>
        <Slide direction="right" duration={1000}>
          <Col>
            <h2>Selection</h2>
            <Card>
              <Slide triggerOnce duration={1500} delay={1000} direction={'right'}>
                <PackageItem packageType={packageType} disabled></PackageItem>
              </Slide>
              {productCategories.map((category, i) => (
                <div key={i}>
                  <h2>{category}</h2>
                  {/*  <div className="productContainer">
              {productsByCategory[category.name].map((product: IProduct, index) => (
                <OverviewProduct key product={product}></OverviewProduct>
              ))}
            </div> */}
                  <Slide triggerOnce delay={1500} duration={1500} direction={'right'}>
                    <Carousel responsive={responsive} itemClass="itemClass">
                      {productsByCategory[category].map((product: IProduct, index) => (
                        <ProductItem key={index} product={product} disabled></ProductItem>
                      ))}
                    </Carousel>
                  </Slide>

                  {/*  {productsByCategory[category].map((product: IProduct, index) => (
                  <div key={index} style={{ display: 'flex' }}>
                    <h5>{product.name}</h5>
                  </div>
                ))} */}
                </div>
              ))}
            </Card>
          </Col>
        </Slide>
      </Row>
    </>
  );
};
{
  /*   <Carousel responsive={responsive} itemClass="itemClass">
    {productsByCategory[category].map((product: IProduct, index) => (
      <Zoom triggerOnce key={index} duration={1500} direction={'up'}>
        <ProductItem product={product} disabled></ProductItem>
      </Zoom>
    ))}
  </Carousel>; */
}

export default Overview;
