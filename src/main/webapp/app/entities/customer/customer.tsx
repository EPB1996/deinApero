import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ICustomer } from 'app/shared/model/customer.model';
import { getEntities } from './customer.reducer';

export const Customer = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const customerList = useAppSelector(state => state.customer.entities);
  const loading = useAppSelector(state => state.customer.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="customer-heading" data-cy="CustomerHeading">
        <Translate contentKey="meinAperoApp.customer.home.title">Customers</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="meinAperoApp.customer.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/customer/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="meinAperoApp.customer.home.createLabel">Create new Customer</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {customerList && customerList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="meinAperoApp.customer.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="meinAperoApp.customer.firstName">First Name</Translate>
                </th>
                <th>
                  <Translate contentKey="meinAperoApp.customer.lastName">Last Name</Translate>
                </th>
                <th>
                  <Translate contentKey="meinAperoApp.customer.gender">Gender</Translate>
                </th>
                <th>
                  <Translate contentKey="meinAperoApp.customer.email">Email</Translate>
                </th>
                <th>
                  <Translate contentKey="meinAperoApp.customer.phone">Phone</Translate>
                </th>
                <th>
                  <Translate contentKey="meinAperoApp.customer.addressLine1">Address Line 1</Translate>
                </th>
                <th>
                  <Translate contentKey="meinAperoApp.customer.addressLine2">Address Line 2</Translate>
                </th>
                <th>
                  <Translate contentKey="meinAperoApp.customer.zip">Zip</Translate>
                </th>
                <th>
                  <Translate contentKey="meinAperoApp.customer.city">City</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {customerList.map((customer, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/customer/${customer.id}`} color="link" size="sm">
                      {customer.id}
                    </Button>
                  </td>
                  <td>{customer.firstName}</td>
                  <td>{customer.lastName}</td>
                  <td>
                    <Translate contentKey={`meinAperoApp.Gender.${customer.gender}`} />
                  </td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.addressLine1}</td>
                  <td>{customer.addressLine2}</td>
                  <td>{customer.zip}</td>
                  <td>{customer.city}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/customer/${customer.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/customer/${customer.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/customer/${customer.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
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
              <Translate contentKey="meinAperoApp.customer.home.notFound">No Customers found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Customer;
