import React from 'react';
import './products.scss';
import { Button, Card, CardBody, CardFooter, CardImg, CardSubtitle, CardText, CardTitle } from 'reactstrap';
const ProductItem = props => {
  const { name, description, prize, productSize, image } = props.product;
  console.log(props);

  return (
    <Card style={{ width: '100%', height: '100%', padding: '0' }}>
      <CardImg alt="Card image cap" src="https://picsum.photos/256/186" top width="100%" />
      <CardBody>
        <CardTitle tag="h5">{name}</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          {productSize} {prize}
        </CardSubtitle>
        <CardText>{description}</CardText>
      </CardBody>
      <CardFooter>
        <Button>Button</Button>
      </CardFooter>
    </Card>
  );
};

export default ProductItem;
