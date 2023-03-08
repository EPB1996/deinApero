/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from 'react';
import './productSelection.scss';
import {
  Col,
  Row,
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Button,
  UncontrolledAccordion,
  Container,
  Card,
  Collapse,
  UncontrolledCollapse,
  CardBody,
} from 'reactstrap';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { IProduct } from 'app/shared/model/product.model';
import ProductItem from './product/productItem';
import { Fade, Slide } from 'react-awesome-reveal';
import { nextStep } from '../stepper/stepper.reducer';
import { IProductCategory } from 'app/shared/model/product-category.model';
import { Translate } from 'react-jhipster';
import Carousel from 'react-spring-3d-carousel';
import Carroussel from './carousel/Carrousel';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

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

const ProductSelection = ({ categoryName }) => {
  const dispatch = useAppDispatch();
  const productCategories = useAppSelector(state => state.productCategory.entities);
  const [products, setProducts] = useState([]);

  const getNumberOfCards = n => {
    if (n <= 6) return 1;
    else return 3;
  };

  useEffect(() => {
    setProducts(
      productCategories
        .filter((productCategory: IProductCategory) => productCategory.name === categoryName)[0]
        .products.map((product: IProduct, index) => {
          const t = {
            key: index,
            content: <ProductItem key={index} product={product} productCategory={`${categoryName}`}></ProductItem>,
          };
          return t;
        })
    );
    console.log(products);
  }, [categoryName]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'nowrap',
          height: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <TransitionGroup className="slide-group">
            <CSSTransition classNames="slide" timeout={{ enter: 500, exit: 500 }} key={categoryName}>
              <div style={{ height: '100%' }}>
                <div
                  style={{
                    fontStyle: 'normal',
                    width: '75vw',
                  }}
                ></div>

                {products.length > 0 && (
                  <Row className="product-scrolling" style={{ justifyContent: 'center', height: '80%' }}>
                    <Carroussel
                      cards={products}
                      height="100%"
                      width="75%"
                      margin="0 auto"
                      offset={getNumberOfCards(products.length)}
                      showArrows={false}
                    />
                  </Row>
                )}
              </div>
            </CSSTransition>
          </TransitionGroup>
        </div>
      </div>
    </div>
  );

  return (
    products.length > 0 && (
      <Row className="product-scrolling" style={{ justifyContent: 'center', height: '80%' }}>
        <Carroussel cards={products} height="100%" width="75%" margin="0 auto" offset={3} showArrows={false} />
      </Row>
    )
    /* productCategories && (
      <>
        {productCategories.map((productCategory: IProductCategory, i) => (
          <>
            <Button style={{ width: '100%', margin: '1px' }} id={productCategory.name}>
              <Translate contentKey={`custom.productCategory.${productCategory.name}`}> {productCategory.name}</Translate>
            </Button>

           
          </>
        ))} 
        <UncontrolledCollapse toggler={`#Champagne`}  style={{height:"60%"}}>
              <Row  className="product-scrolling" style={{ position:"relative", justifyContent: 'center', height:"100%"}}>
                <Carroussel
                  cards={ productCategories.filter((productCategory: IProductCategory) => productCategory.name === "Champagne")[0] &&
                    productCategories
                      .filter((productCategory: IProductCategory) => productCategory.name === "Champagne")[0].products.map((product: IProduct, index) => {
                    const t = {
                      key: index,
                      content: <ProductItem key={index} product={product} productCategory={"Champagne"}></ProductItem>,
                    };
                    return t;
                  })}
                  height="100%"
                  width="75%"
                  margin="0 auto"
                  offset={3}
                  showArrows={false}
                />
              </Row>
            </UncontrolledCollapse>
      </> */
    /*  <>
        <Row style={{ justifyContent: 'center' }}>
          {productCategories.map((productCategory: IProductCategory, i) => (
            <Col key={i} md={2} sm={4} xs={6} lg={2}>
              <Slide key={i} direction="left" duration={1500} triggerOnce>
                <Button onClick={() => toggle(productCategory.name)} style={{  width: '100%', height:"100%", margin:"1px" }}>
                  <Translate contentKey={`custom.productCategory.${productCategory.name}`}> {productCategory.name}</Translate>
                </Button>
              </Slide>
            </Col>
          ))}
        </Row>
        <Row className="product-scrolling" style={{ justifyContent: 'center', height: '80%' }}>
          {open === 'Champagne' && (
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
              width="75%"
              margin="0 auto"
              offset={3}
              showArrows={false}
            />
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
                width="25%"
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
                width="25%"
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
                width="25%"
                margin="0 auto"
                offset={1}
                showArrows={true}
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
                width="25%"
                margin="0 auto"
                offset={2}
                showArrows={false}
              />
            </Row>
          )}
        </Row>
      </> */
  );
};

export default ProductSelection;
