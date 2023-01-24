import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities } from 'app/entities/package-type/package-type.reducer';
import React, { useEffect } from 'react';
import { Translate } from 'react-jhipster';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import PackageItem from './packageItem';

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
const PackageTypeList = () => {
  const dispatch = useAppDispatch();
  const packageTypeList = useAppSelector(state => state.packageType.entities);
  const loading = useAppSelector(state => state.packageType.loading);

  useEffect(() => {
    if (!packageTypeList) dispatch(getEntities({}));
  }, []);

  console.log(packageTypeList);

  return (
    <div>
      {packageTypeList && packageTypeList.length > 0 ? (
        <Carousel partialVisible responsive={responsive} itemClass="productItem">
          {packageTypeList && packageTypeList.length > 0
            ? packageTypeList.map((packageType, i) => <PackageItem key={i} packageType={packageType}></PackageItem>)
            : []}
        </Carousel>
      ) : (
        !packageTypeList && (
          <div className="alert alert-warning">
            <Translate contentKey="meinaperoApp.productCategory.home.notFound">No Product Categories found</Translate>
          </div>
        )
      )}
    </div>
  );
};

export default PackageTypeList;
