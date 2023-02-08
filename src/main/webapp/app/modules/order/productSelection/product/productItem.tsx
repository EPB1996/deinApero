import React, { useState } from 'react';
import './product.scss';
import { Button, Card, CardBody, CardFooter, CardImg, CardSubtitle, CardText, CardTitle, Row } from 'reactstrap';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { addProduct, removeProduct } from './product.reducer';
import { Slide } from 'react-awesome-reveal';
import { IProduct } from 'app/shared/model/product.model';
import { update } from 'lodash';
const ProductItem = props => {
  const { product, productCategory, disabled = false } = props;

  const { name, description, price, productSize, image } = product;
  const dispatch = useAppDispatch();

  const addedProducts = useAppSelector(state => state.products[productCategory]);

  const handleAddProduct = () => {
    dispatch(addProduct({ product, productCategory }));
  };

  const handleRemoveProduct = () => {
    dispatch(removeProduct({ product, productCategory }));
  };

  return (
    <Card outline style={{ position: 'relative', padding: 0, width: '100%' }}>
      {addedProducts && addedProducts[product.id] && (
        <div className="ribbon ribbon-orange ribbon-small ">
          <div className="banner">
            <div className="text">Added</div>
          </div>
        </div>
      )}
      {/*  <CardImg alt="Card image cap" src="https://picsum.photos/256/186" top width="50%" /> */}

      <CardBody>
        <CardTitle tag="h5">{name}</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          {productSize} {price}
        </CardSubtitle>
        <CardText>{description}</CardText>
      </CardBody>
      {!disabled && (
        <CardFooter>
          <Row>
            {addedProducts && !addedProducts[product.id] ? (
              <Button onClick={handleAddProduct}>Add</Button>
            ) : (
              <Row>
                <Button onClick={handleAddProduct}>Add</Button>
                <Button onClick={handleRemoveProduct}>Remove</Button>
              </Row>
            )}
          </Row>
        </CardFooter>
      )}
    </Card>
  );
};

export default ProductItem;
