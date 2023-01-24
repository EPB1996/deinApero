import './packageSelection.scss';
import React, { useEffect } from 'react';
import { Col, Row } from 'reactstrap';
import PackageTypeList from './package/packageTypeList';

const PackageSelection = () => {
  return (
    <div>
      <Row className="justify-content-center">
        <Col md="10">
          <h2 id="meinaperoApp.customer.home.createOrEditLabel" data-cy="CustomerCreateUpdateHeading">
            Select your Package
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="10">
          <PackageTypeList></PackageTypeList>
        </Col>
      </Row>
    </div>
  );
};

export default PackageSelection;
