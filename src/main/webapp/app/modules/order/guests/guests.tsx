import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch } from 'app/config/store';
import { Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { Button, Card, Col, Container, Row } from 'reactstrap';
import { nextStep } from '../stepper/stepper.reducer';
import { addNumberOfGuests } from './guests.reducer';
import { gte } from 'lodash';
import { Slide } from 'react-awesome-reveal';

const Guests = () => {
  const dispatch = useAppDispatch();
  const defaultValues = () => {
    return { numberOfGuests: 0 };
  };

  const saveEntity = values => {
    dispatch(addNumberOfGuests(values));
    dispatch(nextStep());
  };

  return (
    <Slide direction="left" duration={1500} triggerOnce>
      <Row style={{ justifyContent: 'center' }}>
        <Col md={6} style={{ display: 'flex', justifyContent: 'space-around', paddingTop: '10%' }}>
          <Card>
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              <ValidatedField
                label={translate('custom.guest.title')}
                id="numberOfGuests"
                name="numberOfGuests"
                data-cy="numberOfGuests"
                type="number"
                validate={{
                  required: { value: true, message: 'Needs to be greater than 0.' },
                }}
              />
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit">
                <Translate contentKey="custom.guest.confirmation">Confirm</Translate>
              </Button>
            </ValidatedForm>
          </Card>
        </Col>
      </Row>
    </Slide>
  );
};

export default Guests;
