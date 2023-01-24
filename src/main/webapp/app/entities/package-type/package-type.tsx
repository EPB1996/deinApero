import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IPackageType } from 'app/shared/model/package-type.model';
import { getEntities } from './package-type.reducer';

export const PackageType = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const packageTypeList = useAppSelector(state => state.packageType.entities);
  const loading = useAppSelector(state => state.packageType.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="package-type-heading" data-cy="PackageTypeHeading">
        <Translate contentKey="meinAperoApp.packageType.home.title">Package Types</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="meinAperoApp.packageType.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/package-type/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="meinAperoApp.packageType.home.createLabel">Create new Package Type</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {packageTypeList && packageTypeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="meinAperoApp.packageType.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="meinAperoApp.packageType.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="meinAperoApp.packageType.description">Description</Translate>
                </th>
                <th>
                  <Translate contentKey="meinAperoApp.packageType.price">Price</Translate>
                </th>
                <th>
                  <Translate contentKey="meinAperoApp.packageType.packageTemplate">Package Template</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {packageTypeList.map((packageType, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/package-type/${packageType.id}`} color="link" size="sm">
                      {packageType.id}
                    </Button>
                  </td>
                  <td>{packageType.name}</td>
                  <td>{packageType.description}</td>
                  <td>{packageType.price}</td>
                  <td>
                    {packageType.packageTemplate ? (
                      <Link to={`/package-template/${packageType.packageTemplate.id}`}>{packageType.packageTemplate.name}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/package-type/${packageType.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/package-type/${packageType.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/package-type/${packageType.id}/delete`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="meinAperoApp.packageType.home.notFound">No Package Types found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default PackageType;
