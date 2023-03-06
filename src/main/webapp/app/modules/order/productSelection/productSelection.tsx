/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from 'react';
import './productSelection.scss';
import { Col, Row, Accordion, AccordionBody, AccordionHeader, AccordionItem, Button, UncontrolledAccordion, Container } from 'reactstrap';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { IProduct } from 'app/shared/model/product.model';
import ProductItem from './product/productItem';
import { Fade, Slide } from 'react-awesome-reveal';
import { nextStep } from '../stepper/stepper.reducer';
import { IProductCategory } from 'app/shared/model/product-category.model';
import { Translate } from 'react-jhipster';
import Carousel from 'react-spring-3d-carousel';
import Carroussel from './carousel/Carrousel';

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
    <Container style={{ height: '100%' }}>
      {productCategories && (
        <Row style={{ height: '100%' }}>
          <Col md={2} sm={12} lg={2}>
            {productCategories.map((productCategory: IProductCategory, i) => (
              <Slide key={i} direction="left" duration={1500} triggerOnce>
                <Button onClick={() => toggle(productCategory.name)} style={{ width: '100%' }}>
                  <Slide key={i} direction="left" duration={1500}>
                    <p>
                      <Translate contentKey={`custom.productCategory.${productCategory.name}`}> {productCategory.name}</Translate>
                    </p>
                  </Slide>
                </Button>
              </Slide>
            ))}
          </Col>

          <Col md={10} sm={12} lg={10} className="product-scrolling">
            {open === 'Champagne' && (
              <Row style={{ height: '100%', width: '100%' }}>
                <Carroussel
                  cards={
                    productCategories.filter((productCategory: IProductCategory) => productCategory.name === open)[0] &&
                    productCategories
                      .filter((productCategory: IProductCategory) => productCategory.name === open)[0]
                      .products.map((product: IProduct, index) => {
                        const t = {
                          key: index,
                          content: <ProductItem key={index} product={product} productCategory={open}></ProductItem>,
                        };
                        return t;
                      })
                  }
                  height="100%"
                  width="100%"
                  margin="0 auto"
                  offset={2}
                  showArrows={false}
                />
              </Row>
            )}
            {open === 'Kaviar' && (
              <Row style={{ height: '100%', width: '100%' }}>
                <Carroussel
                  cards={
                    productCategories.filter((productCategory: IProductCategory) => productCategory.name === open)[0] &&
                    productCategories
                      .filter((productCategory: IProductCategory) => productCategory.name === open)[0]
                      .products.map((product: IProduct, index) => {
                        const t = {
                          key: index,
                          content: <ProductItem key={index} product={product} productCategory={open}></ProductItem>,
                        };
                        return t;
                      })
                  }
                  height="100%"
                  width="100%"
                  margin="0 auto"
                  offset={2}
                  showArrows={false}
                />
              </Row>
            )}
            {open === 'Austern' && (
              <Row style={{ height: '100%', width: '100%' }}>
                <Carroussel
                  cards={
                    productCategories.filter((productCategory: IProductCategory) => productCategory.name === open)[0] &&
                    productCategories
                      .filter((productCategory: IProductCategory) => productCategory.name === open)[0]
                      .products.map((product: IProduct, index) => {
                        const t = {
                          key: index,
                          content: <ProductItem key={index} product={product} productCategory={open}></ProductItem>,
                        };
                        return t;
                      })
                  }
                  height="100%"
                  width="100%"
                  margin="0 auto"
                  offset={2}
                  showArrows={false}
                />
              </Row>
            )}
            {open === 'Platten' && (
              <Row style={{ height: '100%', width: '100%' }}>
                <Carroussel
                  cards={
                    productCategories.filter((productCategory: IProductCategory) => productCategory.name === open)[0] &&
                    productCategories
                      .filter((productCategory: IProductCategory) => productCategory.name === open)[0]
                      .products.map((product: IProduct, index) => {
                        const t = {
                          key: index,
                          content: <ProductItem key={index} product={product} productCategory={open}></ProductItem>,
                        };
                        return t;
                      })
                  }
                  height="100%"
                  width="100%"
                  margin="0 auto"
                  offset={2}
                  showArrows={false}
                />
              </Row>
            )}
            {open === 'Vegetarisch' && (
              <Row style={{ height: '100%', width: '100%' }}>
                <Carroussel
                  cards={
                    productCategories.filter((productCategory: IProductCategory) => productCategory.name === open)[0] &&
                    productCategories
                      .filter((productCategory: IProductCategory) => productCategory.name === open)[0]
                      .products.map((product: IProduct, index) => {
                        const t = {
                          key: index,
                          content: <ProductItem key={index} product={product} productCategory={open}></ProductItem>,
                        };
                        return t;
                      })
                  }
                  height="100%"
                  width="100%"
                  margin="0 auto"
                  offset={2}
                  showArrows={false}
                />
              </Row>
            )}
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ProductSelection;
