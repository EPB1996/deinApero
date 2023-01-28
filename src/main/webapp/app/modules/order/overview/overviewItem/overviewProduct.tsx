import { width } from '@fortawesome/free-solid-svg-icons/faCogs';
import React, { useState } from 'react';

import { Card, CardBody, CardImg, CardSubtitle, CardTitle } from 'reactstrap';

const OverviewProduct = props => {
  const { name, description, price, productSize, image } = props.product;

  return (
    <Card outline style={{ boxShadow: 'none', padding: 0 }}>
      <CardImg alt="Card image cap" src="https://picsum.photos/256/186" top width="50%" />
      <CardBody>
        <CardTitle tag="h5">{name}</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          {productSize} {price}
        </CardSubtitle>
      </CardBody>
    </Card>
  );
};

export default OverviewProduct;
