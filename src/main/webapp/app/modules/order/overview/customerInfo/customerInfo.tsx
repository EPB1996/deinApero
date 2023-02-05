import React, { useState } from 'react';

import { Button, Row, Col, FormText, Card } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { Gender } from 'app/shared/model/enumerations/gender.model';
import { addCustomerInfo } from './customerInfo.reducer';
import { nextStep } from '../../stepper/stepper.reducer';
import { Slide } from 'react-awesome-reveal';
import { Step, Stepper } from 'react-form-stepper';

export const CustomerInfo = () => {
  const dispatch = useAppDispatch();
  const customerInfo = useAppSelector(state => state.customerInfo);
  const genderValues = Object.keys(Gender);

  const nextStep = values => {
    console.log(values);
    dispatch(addCustomerInfo({ ...values, step: values.step + 1 }));
  };

  const previousStep = () => {
    dispatch(addCustomerInfo({ ...customerInfo, step: customerInfo.step - 1 }));
  };

  const resetCustomerInfo = () => {
    dispatch(addCustomerInfo({ step: 0 }));
  };

  const defaultValues = () => {
    return customerInfo;
  };

  return (
    <Slide direction="left" duration={1500} triggerOnce>
      <Card>
        {/*   {(customerInfo.step === 1 || customerInfo.step === 2 || customerInfo.step === 3) && (
          <Slide direction="right" duration={1500} triggerOnce>
            <div style={{ display: 'inline-block' }}>
              {customerInfo.firstName} {customerInfo.lastName}
            </div>
          </Slide>
        )}

        {(customerInfo.step === 2 || customerInfo.step === 3) && (
          <Slide direction="right" duration={1500} triggerOnce>
            <div>{customerInfo.addressLine1}</div>
            <div>{customerInfo.addressLine2}</div>
            <div style={{ display: 'inline-block' }}>
              {customerInfo.city} {customerInfo.country}
            </div>
          </Slide>
        )}
        {customerInfo.step === 3 && (
          <>
            <Slide direction="right" duration={1500} triggerOnce>
              <div>{customerInfo.email}</div>
              <div>{customerInfo.phone}</div>
            </Slide>
            <Slide direction="left" duration={1500} triggerOnce>
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" onClick={() => resetCustomerInfo()}>
                Change
              </Button>
            </Slide>
          </>
        )} */}
        {customerInfo.step === 0 && (
          <Slide direction="left" duration={1500} triggerOnce>
            <ValidatedForm defaultValues={defaultValues()} onSubmit={nextStep}>
              <ValidatedField
                label={translate('meinAperoApp.customer.firstName')}
                id="customer-firstName"
                name="firstName"
                data-cy="firstName"
                type="text"
              />
              <ValidatedField
                label={translate('meinAperoApp.customer.lastName')}
                id="customer-lastName"
                name="lastName"
                data-cy="lastName"
                type="text"
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
              <ValidatedField label="step" id="step" name="step" data-cy="step" type="number" hidden></ValidatedField>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  disabled={customerInfo.step === 0}
                  color="primary"
                  id="save-entity"
                  data-cy="entityCreateSaveButton"
                  onClick={() => {
                    previousStep();
                  }}
                >
                  Previous
                </Button>

                <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit">
                  Next
                </Button>
              </div>
            </ValidatedForm>
          </Slide>
        )}
        {customerInfo.step === 1 && (
          <Slide direction="left" duration={1500} triggerOnce>
            <ValidatedForm defaultValues={defaultValues()} onSubmit={nextStep}>
              <ValidatedField
                label={translate('meinAperoApp.customer.addressLine1')}
                id="customer-addressLine1"
                name="addressLine1"
                data-cy="addressLine1"
                type="text"
              />
              <ValidatedField
                label={translate('meinAperoApp.customer.addressLine2')}
                id="customer-addressLine2"
                name="addressLine2"
                data-cy="addressLine2"
                type="text"
              />
              <ValidatedField label={translate('meinAperoApp.customer.city')} id="customer-city" name="city" data-cy="city" type="text" />
              <ValidatedField
                label={translate('meinAperoApp.customer.country')}
                id="customer-country"
                name="country"
                data-cy="country"
                type="text"
              />
              <ValidatedField label="step" id="step" name="step" data-cy="step" type="number" hidden></ValidatedField>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  disabled={customerInfo.step === 0}
                  color="primary"
                  id="save-entity"
                  data-cy="entityCreateSaveButton"
                  onClick={() => {
                    previousStep();
                  }}
                >
                  Previous
                </Button>

                <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit">
                  Finish
                </Button>
              </div>
            </ValidatedForm>
          </Slide>
        )}
        {customerInfo.step === 2 && (
          <Slide direction="left" duration={1500} triggerOnce>
            <ValidatedForm defaultValues={defaultValues()} onSubmit={nextStep}>
              <ValidatedField
                label={translate('meinAperoApp.customer.email')}
                id="customer-email"
                name="email"
                data-cy="email"
                type="text"
              />
              <ValidatedField
                label={translate('meinAperoApp.customer.phone')}
                id="customer-phone"
                name="phone"
                data-cy="phone"
                type="text"
              />
              <ValidatedField label="step" id="step" name="step" data-cy="step" type="number" hidden></ValidatedField>{' '}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  disabled={customerInfo.step === 0}
                  color="primary"
                  id="save-entity"
                  data-cy="entityCreateSaveButton"
                  onClick={() => {
                    previousStep();
                  }}
                >
                  Previous
                </Button>

                <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit">
                  Next
                </Button>
              </div>
            </ValidatedForm>
          </Slide>
        )}
      </Card>
    </Slide>
  );
};

export default CustomerInfo;
