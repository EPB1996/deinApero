import './overview.scss';
import { useAppSelector } from 'app/config/store';
import { IProduct } from 'app/shared/model/product.model';
import React from 'react';
import { Fade, Slide } from 'react-awesome-reveal';
import { Card, CardTitle, Col, Row } from 'reactstrap';
import ProductItem from '../productSelection/product/productItem';
import Carousel from 'react-multi-carousel';
import CustomerInfo from '../customerInfo/customerInfo';
import 'react-multi-carousel/lib/styles.css';

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
  const productsByCategory = useAppSelector(state => state.products);
  const productCategories = Object.keys(productsByCategory);

  return (
    <Card>
      <CardTitle tag={'h3'}> Selection</CardTitle>
      {productCategories.map((category, i) => (
        <div key={i}>
          <h2>{category}</h2>
          <Fade triggerOnce delay={1500} duration={1500} direction={'right'}>
            <Carousel responsive={responsive} itemClass="itemClass">
              {productsByCategory[category].map((product: IProduct, index) => (
                <ProductItem key={index} product={product} disabled></ProductItem>
              ))}
            </Carousel>
          </Fade>
        </div>
      ))}
    </Card>
  );
};

export default Overview;
