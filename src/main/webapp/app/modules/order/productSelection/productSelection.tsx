import React, { useEffect } from 'react';
import { Col, Row } from 'reactstrap';
import { useAppSelector } from 'app/config/store';
import { IProduct } from 'app/shared/model/product.model';
import ProductItem from './product/productItem';
import Carousel from 'react-multi-carousel';

const ProductSelection = () => {
  const templateProducts = useAppSelector(state => state.packageTemplate.entities)[0];

  const products = templateProducts.products;

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 2,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
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

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="10">
          <h2 id="meinaperoApp.customer.home.createOrEditLabel" data-cy="CustomerCreateUpdateHeading">
            Select your Package
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        {products && products.length > 0 && (
          <>
            <Col md="10">
              <Carousel partialVisible responsive={responsive} itemClass="productItem">
                {Array.from(products)
                  .filter((product: IProduct) => {
                    return product.productCategory.name === 'Wein';
                  })
                  .map((product, i) => (
                    <ProductItem key={i} product={product}></ProductItem>
                  ))}
              </Carousel>
            </Col>
            <Col md="10">
              <Carousel partialVisible responsive={responsive} itemClass="productItem">
                {Array.from(products)
                  .filter((product: IProduct) => {
                    return product.productCategory.name === 'Kaviar';
                  })
                  .map((product, i) => (
                    <ProductItem key={i} product={product}></ProductItem>
                  ))}
              </Carousel>
            </Col>
          </>
        )}
      </Row>
    </div>
  );
};

export default ProductSelection;
