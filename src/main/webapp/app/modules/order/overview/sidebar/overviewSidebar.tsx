import '../overview.scss';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { Button, Card, CardTitle, Col, Row } from 'reactstrap';
import { Slide } from 'react-awesome-reveal';
import Carousel from 'react-multi-carousel';
import { IProduct } from 'app/shared/model/product.model';
import ProductItem from '../../productSelection/product/productItem';
import CustomerInfo from '../customerInfo/customerInfo';
import { addCustomerInfo } from '../customerInfo/customerInfo.reducer';

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

const OverviewSidebar = () => {
  const [total, setTotal] = useState(0);
  const dispatch = useAppDispatch();

  const productsByCategory = useAppSelector(state => state.products);
  const productCategories = Object.keys(productsByCategory);
  const customerInfo = useAppSelector(state => state.customerInfo);

  useEffect(() => {
    let intermediateSum = 0;

    Object.values(productsByCategory).map((category: any) =>
      Object.values(category).map((item: any) => {
        intermediateSum += item.amount * item.product.price;
      })
    );
    setTotal(intermediateSum);
  }, [productsByCategory]);

  const resetCustomerInfo = () => {
    dispatch(addCustomerInfo({ step: 0 }));
  };

  return (
    <Card style={{ height: '100vh' }}>
      {customerInfo && (
        <>
          <Row>
            <Col md={4}>
              <h5>Name:</h5>
            </Col>
            <Col md={8}>
              {(customerInfo.step === 1 || customerInfo.step === 2 || customerInfo.step === 3) && (
                <Slide direction="right" duration={1500} triggerOnce>
                  <div style={{ display: 'inline-block' }}>
                    {customerInfo.firstName} {customerInfo.lastName}
                  </div>
                </Slide>
              )}
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <h5>Address:</h5>
            </Col>
            <Col md={8}>
              {(customerInfo.step === 2 || customerInfo.step === 3) && (
                <Slide direction="right" duration={1500} triggerOnce>
                  <div style={{ display: 'inline-block' }}>
                    {customerInfo.addressLine1} {customerInfo.addressLine2}
                  </div>
                  <div>{customerInfo.city} </div>
                  <div>{customerInfo.country}</div>
                </Slide>
              )}
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <h5>Contact:</h5>
            </Col>
            <Col md={8}>
              {customerInfo.step === 3 && (
                <>
                  <Slide direction="right" duration={1500} triggerOnce>
                    <div>{customerInfo.email}</div>
                    <div>{customerInfo.phone}</div>
                  </Slide>
                  <Slide direction="left" duration={1500} triggerOnce>
                    <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" onClick={() => resetCustomerInfo()}>
                      Change
                    </Button>
                  </Slide>
                </>
              )}
            </Col>
          </Row>
        </>
      )}

      <Slide triggerOnce duration={1500} direction={'right'} delay={1000}>
        <CardTitle tag={'h3'}> Selection</CardTitle>
      </Slide>
      {productCategories.map((category, i) => (
        <div key={i}>
          <Slide triggerOnce duration={1500} direction={'right'} delay={1000}>
            <div className="sideBarItem">
              <h5>{category}</h5>
              <div>
                {Object.keys(productsByCategory[category]).reduce((sum: number, productKey) => {
                  return (sum += productsByCategory[category][productKey].amount * productsByCategory[category][productKey].product.price);
                }, 0)}
              </div>
            </div>
          </Slide>

          <Slide triggerOnce duration={1500} direction={'right'}>
            {Object.keys(productsByCategory[category]).map((productKey, index) => {
              return (
                <Row>
                  <Col style={{ flexGrow: 1 }}>
                    <div>{productsByCategory[category][productKey].amount}</div>
                  </Col>
                  <Col style={{ flexGrow: 8 }}>
                    <div>{productsByCategory[category][productKey].product.name}</div>
                  </Col>
                  <Col style={{ flexGrow: 1 }}>
                    <div style={{ position: 'absolute', right: 0 }}>
                      {productsByCategory[category][productKey].amount * productsByCategory[category][productKey].product.price}
                    </div>
                  </Col>
                </Row>
              );
            })}
          </Slide>
          <hr
            style={{
              marginTop: '5px',
              marginBottom: '5px',
              background: 'gray',
              color: 'gray',
              borderColor: 'gray',
              height: '1px',
            }}
          />
        </div>
      ))}
      <Slide triggerOnce duration={1500} direction={'right'} delay={1000}>
        <div className="sideBarItem">
          <h5>Total</h5>
          <div>{total}</div>
        </div>
      </Slide>
    </Card>
  );
};

export default OverviewSidebar;
