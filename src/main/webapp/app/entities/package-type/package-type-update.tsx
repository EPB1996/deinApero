import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IPackageTemplate } from 'app/shared/model/package-template.model';
import { getEntities as getPackageTemplates } from 'app/entities/package-template/package-template.reducer';
import { IPackageType } from 'app/shared/model/package-type.model';
import { getEntity, updateEntity, createEntity, reset } from './package-type.reducer';

export const PackageTypeUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const packageTemplates = useAppSelector(state => state.packageTemplate.entities);
  const packageTypeEntity = useAppSelector(state => state.packageType.entity);
  const loading = useAppSelector(state => state.packageType.loading);
  const updating = useAppSelector(state => state.packageType.updating);
  const updateSuccess = useAppSelector(state => state.packageType.updateSuccess);

  const handleClose = () => {
    navigate('/package-type');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getPackageTemplates({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...packageTypeEntity,
      ...values,
      packageTemplate: packageTemplates.find(it => it.id.toString() === values.packageTemplate.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...packageTypeEntity,
          packageTemplate: packageTypeEntity?.packageTemplate?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="meinAperoApp.packageType.home.createOrEditLabel" data-cy="PackageTypeCreateUpdateHeading">
            <Translate contentKey="meinAperoApp.packageType.home.createOrEditLabel">Create or edit a PackageType</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="package-type-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('meinAperoApp.packageType.name')}
                id="package-type-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('meinAperoApp.packageType.description')}
                id="package-type-description"
                name="description"
                data-cy="description"
                type="text"
              />
              <ValidatedField
                label={translate('meinAperoApp.packageType.price')}
                id="package-type-price"
                name="price"
                data-cy="price"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                id="package-type-packageTemplate"
                name="packageTemplate"
                data-cy="packageTemplate"
                label={translate('meinAperoApp.packageType.packageTemplate')}
                type="select"
              >
                <option value="" key="0" />
                {packageTemplates
                  ? packageTemplates.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/package-type" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default PackageTypeUpdate;
