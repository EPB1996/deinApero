import React from 'react';

import { Button, Row, Col, FormText } from 'reactstrap';
import { Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { Gender } from 'app/shared/model/enumerations/gender.model';
import { addCustomerInfo, CustomerInfoObject } from './customerInfo.reducer';
import { nextStep } from '../stepper/stepper.reducer';

export const CustomerInfo = () => {
  const dispatch = useAppDispatch();

  const customerInfo = useAppSelector(state => state.customerInfo);
  const genderValues = Object.keys(Gender);

  const saveEntity = values => {
    dispatch(addCustomerInfo(values));
    dispatch(nextStep());
  };

  const defaultValues = () => {
    return customerInfo;
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8"></Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
            <ValidatedField
              label={translate('meinAperoApp.customer.firstName')}
              id="customer-firstName"
              name="firstName"
              data-cy="firstName"
              type="text"
              validate={{
                required: { value: true, message: translate('entity.validation.required') },
              }}
            />
            <ValidatedField
              label={translate('meinAperoApp.customer.lastName')}
              id="customer-lastName"
              name="lastName"
              data-cy="lastName"
              type="text"
              validate={{
                required: { value: true, message: translate('entity.validation.required') },
              }}
            />
            <ValidatedField
              label={translate('meinAperoApp.customer.gender')}
              id="customer-gender"
              name="gender"
              data-cy="gender"
              type="select"
            >
              {genderValues.map(gender => (
                <option value={gender} key={gender}>
                  {translate('meinAperoApp.Gender.' + gender)}
                </option>
              ))}
            </ValidatedField>
            <ValidatedField
              label={translate('meinAperoApp.customer.email')}
              id="customer-email"
              name="email"
              data-cy="email"
              type="text"
              validate={{
                required: { value: true, message: translate('entity.validation.required') },
                pattern: {
                  value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                  message: translate('entity.validation.pattern', { pattern: '^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$' }),
                },
              }}
            />
            <ValidatedField
              label={translate('meinAperoApp.customer.phone')}
              id="customer-phone"
              name="phone"
              data-cy="phone"
              type="text"
              validate={{
                required: { value: true, message: translate('entity.validation.required') },
              }}
            />
            <ValidatedField
              label={translate('meinAperoApp.customer.addressLine1')}
              id="customer-addressLine1"
              name="addressLine1"
              data-cy="addressLine1"
              type="text"
              validate={{
                required: { value: true, message: translate('entity.validation.required') },
              }}
            />
            <ValidatedField
              label={translate('meinAperoApp.customer.addressLine2')}
              id="customer-addressLine2"
              name="addressLine2"
              data-cy="addressLine2"
              type="text"
            />
            <ValidatedField
              label={translate('meinAperoApp.customer.city')}
              id="customer-city"
              name="city"
              data-cy="city"
              type="text"
              validate={{
                required: { value: true, message: translate('entity.validation.required') },
              }}
            />
            <ValidatedField
              label={translate('meinAperoApp.customer.country')}
              id="customer-country"
              name="country"
              data-cy="country"
              type="text"
              validate={{
                required: { value: true, message: translate('entity.validation.required') },
              }}
            />
            <FormText></FormText>
            <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit">
              <FontAwesomeIcon icon="save" />
              Next
            </Button>
          </ValidatedForm>
        </Col>
      </Row>
    </div>
  );
};

export default CustomerInfo;
