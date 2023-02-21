import React, { useState } from 'react';
import './product.scss';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardImg,
  CardImgOverlay,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from 'reactstrap';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { addProduct, removeProduct } from './product.reducer';
import { Slide } from 'react-awesome-reveal';
import { IProduct } from 'app/shared/model/product.model';
import { update } from 'lodash';
const ProductItem = props => {
  const { product, productCategory, disabled = false } = props;
  const { name, description, price, productSize, image } = product;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const dispatch = useAppDispatch();

  const addedProducts = useAppSelector(state => state.products[productCategory]);

  const handleAddProduct = () => {
    dispatch(addProduct({ product, productCategory }));
  };

  const handleRemoveProduct = () => {
    dispatch(removeProduct({ product, productCategory }));
  };

  return (
    <Col md={6} style={{ paddingBottom: '5px' }}>
      <Card outline style={{ position: 'relative', padding: 0, width: '100%' }}>
        {addedProducts && addedProducts[product.id] && (
          <div className="ribbon ribbon-orange ribbon-small ">
            <div className="banner">
              <div className="text">Added</div>
            </div>
          </div>
        )}
        <CardImg alt="Card image cap" src="https://picsum.photos/900/300?grayscale" />
        <CardImgOverlay onClick={toggle} style={{ height: '100%' }}>
          <CardTitle tag="h5">{name}</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            {productSize} {price}
          </CardSubtitle>
        </CardImgOverlay>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>{name}</ModalHeader>
          <ModalBody>
            {description}
            <Row style={{ paddingTop: '5px' }}>
              <Col style={{ padding: '1px' }} md={6} sm={6} xs={12}>
                <Button style={{ width: '100%' }} onClick={handleAddProduct}>
                  Add
                </Button>
              </Col>
              <Col style={{ padding: '1px' }} md={6} sm={6} xs={12}>
                <Button style={{ width: '100%' }} onClick={handleRemoveProduct}>
                  Remove
                </Button>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
        {!disabled && (
          <CardFooter style={{ zIndex: 100 }}>
            <Row>
              <Col style={{ padding: '1px' }} md={6} sm={6} xs={12}>
                <Button style={{ width: '100%' }} onClick={handleAddProduct}>
                  Add
                </Button>
              </Col>
              <Col style={{ padding: '1px' }} md={6} sm={6} xs={12}>
                <Button style={{ width: '100%' }} onClick={handleRemoveProduct}>
                  Remove
                </Button>
              </Col>
            </Row>
          </CardFooter>
        )}
      </Card>
    </Col>
  );
};

export default ProductItem;
