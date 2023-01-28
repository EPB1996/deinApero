import './overview.scss';
import { useAppSelector } from 'app/config/store';
import { IProductCategory } from 'app/shared/model/product-category.model';
import { IProduct } from 'app/shared/model/product.model';
import React from 'react';
import { Zoom } from 'react-awesome-reveal';
import { Card, CardBody, Col, ListGroup, ListGroupItem, Row } from 'reactstrap';
import PackageItem from '../packageSelection/package/packageItem';
import ProductItem from '../productSelection/product/productItem';
import OverviewProduct from './overviewItem/overviewProduct';
import Carousel from 'react-multi-carousel';

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

const Overview = () => {
  const packageType = useAppSelector(state => state.packageReducer.packageType);
  const productsByCategory = useAppSelector(state => state.products);

  const productCategories = useAppSelector(state => state.productCategory.entities);

  return (
    <>
      <Row>
        <PackageItem packageType={packageType} disabled></PackageItem>
      </Row>
      <Row md={2} sm={1} xs={1}>
        {productCategories.map((category: IProductCategory, i) => (
          <div key={i}>
            <h2>{category.name}</h2>
            {/*  <div className="productContainer">
              {productsByCategory[category.name].map((product: IProduct, index) => (
                <OverviewProduct key product={product}></OverviewProduct>
              ))}
            </div> */}
            <Card>
              <Carousel responsive={responsive} itemClass="itemClass">
                {productsByCategory[category.name].map((product: IProduct, index) => (
                  <OverviewProduct key product={product}></OverviewProduct>
                ))}
              </Carousel>
            </Card>
          </div>
        ))}
      </Row>
    </>
  );
};
{
  /*  <Zoom triggerOnce key={index} duration={1500} direction={'up'}>
<ProductItem product={product} disabled></ProductItem>
</Zoom> */
}

export default Overview;
