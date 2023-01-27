import './packageSelection.scss';
import 'react-multi-carousel/lib/styles.css';
import React, { useEffect } from 'react';
import { Col, Row } from 'reactstrap';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities } from 'app/entities/package-type/package-type.reducer';
import Carousel from 'react-multi-carousel';
import { Translate } from 'react-jhipster';
import PackageItem from './package/packageItem';
import { Slide, Zoom } from 'react-awesome-reveal';

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

const PackageSelection = () => {
  const dispatch = useAppDispatch();
  const packageTypeList = useAppSelector(state => state.packageType.entities);
  const loading = useAppSelector(state => state.packageType.loading);

  const packages = packageTypeList.map((packageType, i) => (
    <PackageItem key={i} packageType={packageType} style={{ margin: '5px' }}></PackageItem>
  ));

  return (
    <div>
      <Row className="justify-content-center">
        <Col style={{ display: 'flex', justifyContent: 'center' }}>
          {packageTypeList && packageTypeList.length > 0 ? (
            <div style={{ display: 'flex' }}>
              <Zoom direction="up" duration={1500} cascade style={{ padding: '5px' }}>
                {packages}
              </Zoom>
            </div>
          ) : (
            !packageTypeList && (
              <div className="alert alert-warning">
                <Translate contentKey="meinaperoApp.productCategory.home.notFound">No Product Categories found</Translate>
              </div>
            )
          )}
        </Col>
      </Row>
    </div>
  );
};

export default PackageSelection;
