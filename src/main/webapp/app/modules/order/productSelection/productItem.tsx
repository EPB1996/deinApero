import React, { useState } from 'react';
import './productSelection.scss';
import { Button, Card, CardBody, CardFooter, CardImg, CardSubtitle, CardText, CardTitle } from 'reactstrap';
import { useAppDispatch } from 'app/config/store';
import { addProduct, removeProduct } from './product.reducer';
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
    <Card style={{ width: '100%', height: '100%', padding: '0', overflow: 'hidden' }}>
      <div className={className}>
        <span>Added</span>
      </div>
      <CardImg alt="Card image cap" src="https://picsum.photos/256/186" top width="100%" />

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
