import React, { useEffect, useState } from 'react';
import { useAppSelector } from 'app/config/store';
import { Card, CardTitle, Col, Row } from 'reactstrap';
import { Slide } from 'react-awesome-reveal';
import Carousel from 'react-multi-carousel';
import { IProduct } from 'app/shared/model/product.model';
import ProductItem from '../../productSelection/product/productItem';

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

  const productsByCategory = useAppSelector(state => state.products);
  const productCategories = Object.keys(productsByCategory);

  useEffect(() => {
    let intermediateSum = 0;
    console.log(productsByCategory);
    Object.values(productsByCategory).map((products: Array<IProduct>) =>
      products.map((product: IProduct) => {
        intermediateSum += product.price;
      })
    );
    setTotal(intermediateSum);
  }, [productsByCategory]);

  return (
    <Card>
      <CardTitle tag={'h3'}> Selection</CardTitle>
      {productCategories.map((category, i) => (
        <div key={i}>
          <div className="sideBarItem">
            <h5>{category}</h5>
            <div>
              {productsByCategory[category].reduce((sum: number, product: IProduct) => {
                return (sum += product.price);
              }, 0)}
            </div>
          </div>

          <Slide triggerOnce duration={1500} direction={'right'}>
            {productsByCategory[category].map((product: IProduct, index) => (
              <div key={index} className="sideBarItem">
                <div>{product.name}</div>
                <div>{product.price}</div>
              </div>
            ))}
          </Slide>
          <hr
            style={{
              margin: '5px',
              background: 'gray',
              color: 'gray',
              borderColor: 'gray',
              height: '1px',
            }}
          />
        </div>
      ))}

      <div className="sideBarItem">
        <h5>Total</h5>
        <div>{total}</div>
      </div>
    </Card>
  );
};

export default OverviewSidebar;
