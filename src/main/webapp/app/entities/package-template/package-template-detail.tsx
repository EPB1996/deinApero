import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './package-template.reducer';

export const PackageTemplateDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const packageTemplateEntity = useAppSelector(state => state.packageTemplate.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="packageTemplateDetailsHeading">
          <Translate contentKey="meinAperoApp.packageTemplate.detail.title">PackageTemplate</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{packageTemplateEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="meinAperoApp.packageTemplate.name">Name</Translate>
            </span>
          </dt>
          <dd>{packageTemplateEntity.name}</dd>
          <dt>
            <Translate contentKey="meinAperoApp.packageTemplate.product">Product</Translate>
          </dt>
          <dd>
            {packageTemplateEntity.products
              ? packageTemplateEntity.products.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.name}</a>
                    {packageTemplateEntity.products && i === packageTemplateEntity.products.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/package-template" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/package-template/${packageTemplateEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default PackageTemplateDetail;
