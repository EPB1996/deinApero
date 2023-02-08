import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch } from 'app/config/store';
import { ValidatedField, ValidatedForm } from 'react-jhipster';
import { Button, Card, Container } from 'reactstrap';
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
    <Container style={{ width: '50%' }}>
      <Slide direction="left" duration={1500} triggerOnce>
        <Card>
          <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
            <ValidatedField
              label={'Number of Guests'}
              id="numberOfGuests"
              name="numberOfGuests"
              data-cy="numberOfGuests"
              type="number"
              validate={{
                required: { value: true, message: 'Needs to be greater than 0.' },
              }}
            />
            <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit">
              <FontAwesomeIcon icon="save" />
              Next
            </Button>
          </ValidatedForm>
        </Card>
      </Slide>
    </Container>
  );
};

export default Guests;