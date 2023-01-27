import React, { useState } from 'react';
import './product.scss';
import { Button, Card, CardBody, CardFooter, CardImg, CardSubtitle, CardText, CardTitle, Row } from 'reactstrap';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { addProduct, removeProduct } from './product.reducer';
import { Slide } from 'react-awesome-reveal';
import { IProduct } from 'app/shared/model/product.model';
import { update } from 'lodash';
const ProductItem = ({ product }) => {
  const dispatch = useAppDispatch();
  const { name, description, price, productSize, image } = product;

  const addedProducts = useAppSelector(state => state.products[product.productCategory.name]);

  const handleAddProduct = () => {
    dispatch(addProduct(product));
  };

  const handleRemoveProduct = () => {
    dispatch(removeProduct(product));
  };

  return (
    <Card outline style={{ position: 'relative', padding: 0, width: '100%' }}>
      {addedProducts && addedProducts.includes(product.id) && (
        <div className="ribbon ribbon-orange ribbon-small ">
          <div className="banner">
            <div className="text">Added</div>
          </div>
        </div>
      )}
      <CardImg alt="Card image cap" src="https://picsum.photos/256/186" top width="50%" />

      <CardBody>
        <CardTitle tag="h5">{name}</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          {productSize} {price}
        </CardSubtitle>
        <CardText>{description}</CardText>
      </CardBody>
      <CardFooter>
        <Row>
          {addedProducts && !addedProducts.includes(product.id) ? (
            <Button onClick={handleAddProduct}>Add</Button>
          ) : (
            <Button onClick={handleRemoveProduct}>Remove</Button>
          )}
        </Row>
      </CardFooter>
    </Card>
  );
};

export default ProductItem;
