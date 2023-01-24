import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities } from 'app/entities/product/product.reducer';
import React, { useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ProductItem from './productItem';
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 2,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
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
const Products = props => {
  const { productCategory } = props;

  const dispatch = useAppDispatch();
  const productsInCategory: Array<any> = useAppSelector(state => state.product.entities);
  const loading = useAppSelector(state => state.product.loading);

  console.log('filtered array');
  console.log(productsInCategory.filter((product: any) => product.productCategory.name === productCategory));
  useEffect(() => {
    if (!productsInCategory) dispatch(getEntities({}));
  });

  const renderProducts = () => {
    return (
      <Carousel partialVisbile responsive={responsive} itemClass="productItem">
        {productsInCategory && productsInCategory.length > 0
          ? productsInCategory
              .filter((product: any) => product.productCategory.name === productCategory)
              .map((product, i) => <ProductItem key={i} product={product}></ProductItem>)
          : []}
      </Carousel>
    );
  };

  return renderProducts();
};

export default Products;
