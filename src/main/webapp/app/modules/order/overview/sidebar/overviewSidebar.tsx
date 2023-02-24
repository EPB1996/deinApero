import '../overview.scss';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { Button, Card, CardTitle, Col, Row } from 'reactstrap';
import { Slide } from 'react-awesome-reveal';

import { addCustomerInfo, reset as resetCustomerInfo } from '../customerInfo/customerInfo.reducer';
import { createEntity as createCustomer } from 'app/entities/customer/customer.reducer';
import { createEntity as createOrder } from 'app/entities/order/order.reducer';
import { OrderStatus } from 'app/shared/model/enumerations/order-status.model';
import { IOrder } from 'app/shared/model/order.model';
import { convertDateTimeToServer, defaultDateTimeNow } from 'app/shared/util/date-utils';
import { v4 as uuidv4 } from 'uuid';
import { forEach } from 'lodash';
import { createEntity as createOrderItem } from 'app/entities/order-item/order-item.reducer';
import { Navigate, useNavigate } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { reset as resetProductSelection } from '../../productSelection/product/product.reducer';
import { reset as resetOrderStepper } from '../../stepper/stepper.reducer';
import { reset as resetGuests } from '../../guests/guests.reducer';

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

const OverviewSidebar = ({ overViewExpand }) => {
  const [total, setTotal] = useState(0);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const productsByCategory = useAppSelector(state => state.products);
  const productCategories = Object.keys(productsByCategory);
  const customerInfo = useAppSelector(state => state.customerInfo);
  const numberOfGuests = useAppSelector(state => state.guests.numberOfGuests);
  const user = useAppSelector(state => state.authentication.account);
  const step = useAppSelector(state => state.orderStepper.activeStep);

  useEffect(() => {
    let intermediateSum = 0;

    Object.values(productsByCategory).map((category: any) =>
      Object.values(category).map((item: any) => {
        intermediateSum += item.amount * item.product.price;
      })
    );
    setTotal(intermediateSum);
  }, [productsByCategory]);

  const resetCustomerInfoStep = () => {
    dispatch(addCustomerInfo({ step: 0 }));
  };

  const submitOrder = () => {
    //Unschöner Prozess hier....
    const customerEntity = {
      ...customerInfo,
      user: user,
    };

    dispatch(createCustomer(customerEntity))
      .unwrap()
      .then(customerObject => {
        const orderEntity: any = {
          placedDate: convertDateTimeToServer(defaultDateTimeNow()),
          status: OrderStatus.PENDING,
          code: uuidv4(),
          customer: customerObject.data,
        };
        dispatch(createOrder(orderEntity))
          .unwrap()
          .then(orderObject => {
            productCategories.map(category => {
              Object.keys(productsByCategory[category]).map((productKey, index) => {
                const orderItemEntity = {
                  quantity: productsByCategory[category][productKey].amount,
                  totalPrice: productsByCategory[category][productKey].amount * productsByCategory[category][productKey].product.price,
                  product: productsByCategory[category][productKey].product,
                  order: orderObject.data,
                };
                dispatch(createOrderItem(orderItemEntity));
              });
            });
          })
          .then(() => {
            dispatch(resetProductSelection());
            dispatch(resetCustomerInfo());
            dispatch(resetOrderStepper());
            dispatch(resetGuests());
            navigate('/');
          });
      });
  };

  return (
    <Card className="h-100" style={{ overflowX: 'hidden' }}>
      {overViewExpand && (
        <div>
          <Slide triggerOnce duration={1500} direction={'left'}>
            <Row>
              <Col md={4}>
                <h5>
                  <Translate contentKey={`custom.overview.name`}> Name</Translate>:
                </h5>
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
                <h5>
                  {' '}
                  <Translate contentKey={`custom.overview.address`}> Address</Translate>:
                </h5>
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
                <h5>
                  <Translate contentKey={`custom.overview.address`}> Contact</Translate>:
                </h5>
              </Col>
              <Col md={8}>
                {customerInfo.step === 3 && (
                  <Slide direction="right" duration={1500} triggerOnce>
                    <div>{customerInfo.email}</div>
                    <div>{customerInfo.phone}</div>
                  </Slide>
                )}
              </Col>
            </Row>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              {customerInfo.step === 3 && (
                <Slide style={{ width: '100%', padding: '1px' }} direction="left" duration={1500} triggerOnce>
                  <Button
                    style={{ width: '100%' }}
                    color="primary"
                    id="save-entity"
                    data-cy="entityCreateSaveButton"
                    onClick={() => resetCustomerInfoStep()}
                  >
                    <Translate contentKey={`custom.overview.changeButton`}> Change</Translate>
                  </Button>
                  <Button
                    style={{ width: '100%' }}
                    color="primary"
                    id="save-entity"
                    data-cy="entityCreateSaveButton"
                    onClick={() => submitOrder()}
                  >
                    <Translate contentKey={`custom.overview.submitButton`}> Submit Order</Translate>
                  </Button>
                </Slide>
              )}
            </div>
          </Slide>
        </div>
      )}

      <Slide triggerOnce duration={1500} direction={'right'} delay={1000}>
        <CardTitle tag={'h3'}>
          <Translate contentKey={`custom.overview.selectionTitle`}> Selection</Translate>
        </CardTitle>
      </Slide>
      {productCategories.map((category, i) => (
        <div key={i}>
          <Slide triggerOnce duration={1500} direction={'right'} delay={1000}>
            <div className="sideBarItem">
              <h5>
                <Translate contentKey={`custom.productCategory.${category}`}> {category}</Translate>
              </h5>
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
                <Row key={index}>
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
      <Slide style={{ marginTop: 'auto' }} triggerOnce duration={1500} direction={'right'} delay={1000}>
        <div className="sideBarItem">
          <h5 style={{ marginBottom: 0, marginTop: 'auto' }}>
            {' '}
            <Translate contentKey={`custom.overview.total`}>Total </Translate>
          </h5>
          <div>{total}</div>
        </div>
      </Slide>
      {numberOfGuests > 0 && step === 2 && (
        <Slide triggerOnce duration={1500} direction={'right'} delay={1000}>
          <div className="sideBarItem">
            <h5 style={{ marginBottom: 0, marginTop: 'auto' }}>
              <Translate contentKey={`custom.overview.totalPerPerson`}>Total per Person </Translate>
            </h5>
            <div>{total / numberOfGuests}</div>
          </div>
        </Slide>
      )}
    </Card>
  );
};

export default OverviewSidebar;
