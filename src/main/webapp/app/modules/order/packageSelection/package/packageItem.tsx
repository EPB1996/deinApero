import React from 'react';
import './package.scss';
import { Button, Card, CardBody, CardFooter, CardImg, CardSubtitle, CardText, CardTitle } from 'reactstrap';
import { useAppDispatch } from 'app/config/store';
import { nextStep } from '../../stepper/stepper.reducer';
import { addPackageType } from './package.reducer';
const PackageItem = props => {
  const dispatch = useAppDispatch();
  const { packageType } = props;

  const handlePackageSelecction = () => {
    dispatch(addPackageType(packageType));
    dispatch(nextStep());
  };

  return (
    <Card color="light" outline style={{ width: '100%', height: '100%', padding: '0', overflow: 'hidden' }}>
      <CardBody>
        <CardTitle tag="h5">{packageType.name}</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          Package Subtitle
        </CardSubtitle>
        <CardText>This is a package description</CardText>
      </CardBody>
      <CardFooter>
        <Button className="packageButton" onClick={handlePackageSelecction}>
          Select
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PackageItem;
