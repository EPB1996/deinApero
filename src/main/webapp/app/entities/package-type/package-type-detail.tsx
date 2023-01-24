import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './package-type.reducer';

export const PackageTypeDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const packageTypeEntity = useAppSelector(state => state.packageType.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="packageTypeDetailsHeading">
          <Translate contentKey="meinAperoApp.packageType.detail.title">PackageType</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{packageTypeEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="meinAperoApp.packageType.name">Name</Translate>
            </span>
          </dt>
          <dd>{packageTypeEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="meinAperoApp.packageType.description">Description</Translate>
            </span>
          </dt>
          <dd>{packageTypeEntity.description}</dd>
          <dt>
            <span id="price">
              <Translate contentKey="meinAperoApp.packageType.price">Price</Translate>
            </span>
          </dt>
          <dd>{packageTypeEntity.price}</dd>
          <dt>
            <Translate contentKey="meinAperoApp.packageType.packageTemplate">Package Template</Translate>
          </dt>
          <dd>{packageTypeEntity.packageTemplate ? packageTypeEntity.packageTemplate.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/package-type" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/package-type/${packageTypeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default PackageTypeDetail;
