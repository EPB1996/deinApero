import React, { useState } from 'react';
import './product.scss';
import { Button, Card, CardBody, CardFooter, CardImg, CardSubtitle, CardText, CardTitle } from 'reactstrap';
import { useAppDispatch } from 'app/config/store';
import { addProduct, removeProduct } from './product.reducer';
import { Slide } from 'react-awesome-reveal';
const ProductItem = props => {
  const dispatch = useAppDispatch();
  const { name, description, prize, productSize, image } = props.product;

  const [className, setClassName] = useState('productRibbon hidden');

  const handleAddProduct = () => {
    dispatch(addProduct(props.product));
    setClassName('productRibbon show');
  };

  const handleRemoveProduct = () => {
    dispatch(removeProduct(props.product));
    setClassName('productRibbon hidden');
  };

  return (
    <Card color="light" outline style={{ width: '100%', overflow: 'hidden' }}>
      <div className={className}>
        <span>Added</span>
      </div>
      <CardImg alt="Card image cap" src="https://picsum.photos/256/186" top width="50%" />

      <CardBody>
        <CardTitle tag="h5">{name}</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          {productSize} {prize}
        </CardSubtitle>
        <CardText>{description}</CardText>
      </CardBody>
      <CardFooter>
        <Button onClick={handleAddProduct}>Add</Button>
        <Button onClick={handleRemoveProduct}>Remove</Button>
      </CardFooter>
    </Card>
  );
};

export default ProductItem;
