/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from 'react';
import './productSelection.scss';
import { Col, Row, Accordion, AccordionBody, AccordionHeader, AccordionItem, Button, UncontrolledAccordion } from 'reactstrap';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { IProduct } from 'app/shared/model/product.model';
import ProductItem from './product/productItem';
import Carousel from 'react-multi-carousel';
import { Fade, Slide } from 'react-awesome-reveal';
import { nextStep } from '../stepper/stepper.reducer';
import { IProductCategory } from 'app/shared/model/product-category.model';

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

const ProductSelection = () => {
  const dispatch = useAppDispatch();
  const productCategories = useAppSelector(state => state.productCategory.entities);
  const [open, setOpen] = useState('Champagne');

  const toggle = id => {
    setOpen(id);
  };

  const handleNext = () => {
    dispatch(nextStep());
  };

  return (
    <div style={{ height: '100%' }}>
      {productCategories && (
        <Row style={{ height: '100%' }}>
          <Col md={12} sm={12} lg={2}>
            <Row>
              <div>
                {productCategories.map((productCategory: IProductCategory, i) => (
                  <Slide className="productItem" key={i} direction="left" duration={1500} triggerOnce>
                    <Button onClick={() => toggle(productCategory.name)} style={{ width: '100%' }}>
                      <Slide key={i} direction="left" duration={1500}>
                        <p>{productCategory.name}</p>
                      </Slide>
                    </Button>
                  </Slide>
                ))}
              </div>
            </Row>
          </Col>

          <Col className="product-scrolling">
            {open === 'Champagne' && (
              <Slide className="productItem" direction="right" duration={200} triggerOnce cascade>
                <Row>
                  {productCategories.filter((productCategory: IProductCategory) => productCategory.name === open)[0] &&
                    productCategories
                      .filter((productCategory: IProductCategory) => productCategory.name === open)[0]
                      .products.map((product: IProduct, index) => (
                        <ProductItem key={index} product={product} productCategory={open}></ProductItem>
                      ))}
                </Row>
              </Slide>
            )}
            {open === 'Kaviar' && (
              <Slide className="productItem" direction="right" duration={200} triggerOnce cascade>
                <Row>
                  {productCategories.filter((productCategory: IProductCategory) => productCategory.name === open)[0] &&
                    productCategories
                      .filter((productCategory: IProductCategory) => productCategory.name === open)[0]
                      .products.map((product: IProduct, index) => (
                        <ProductItem key={index} product={product} productCategory={open}></ProductItem>
                      ))}
                </Row>
              </Slide>
            )}
            {open === 'Austern' && (
              <Slide className="productItem" direction="right" duration={200} triggerOnce cascade>
                <Row>
                  {productCategories.filter((productCategory: IProductCategory) => productCategory.name === open)[0] &&
                    productCategories
                      .filter((productCategory: IProductCategory) => productCategory.name === open)[0]
                      .products.map((product: IProduct, index) => (
                        <ProductItem key={index} product={product} productCategory={open}></ProductItem>
                      ))}
                </Row>
              </Slide>
            )}
            {open === 'Platten' && (
              <Slide className="productItem" direction="right" duration={200} triggerOnce cascade>
                <Row>
                  {productCategories.filter((productCategory: IProductCategory) => productCategory.name === open)[0] &&
                    productCategories
                      .filter((productCategory: IProductCategory) => productCategory.name === open)[0]
                      .products.map((product: IProduct, index) => (
                        <ProductItem key={index} product={product} productCategory={open}></ProductItem>
                      ))}
                </Row>
              </Slide>
            )}
            {open === 'Vegetarisch' && (
              <Slide className="productItem" direction="right" duration={200} triggerOnce cascade>
                <Row>
                  {productCategories.filter((productCategory: IProductCategory) => productCategory.name === open)[0] &&
                    productCategories
                      .filter((productCategory: IProductCategory) => productCategory.name === open)[0]
                      .products.map((product: IProduct, index) => (
                        <ProductItem key={index} product={product} productCategory={open}></ProductItem>
                      ))}
                </Row>
              </Slide>
            )}
          </Col>
        </Row>
      )}
    </div>
  );
};

export default ProductSelection;
