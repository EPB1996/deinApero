import React from 'react';
import './package.scss';
import { Button, Card, CardBody, CardFooter, CardImg, CardSubtitle, CardText, CardTitle } from 'reactstrap';
import { useAppDispatch } from 'app/config/store';
import { nextStep } from '../../stepper/stepper.reducer';
const PackageItem = props => {
  const dispatch = useAppDispatch();
  const { packageType } = props;
  console.log(packageType);

  const handlePackageSelecction = () => {
    dispatch(nextStep());
  };

  return (
    <Card style={{ width: '100%', height: '100%', padding: '0' }}>
      <CardBody>
        <CardTitle tag="h5">{packageType.name}</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          Package Subtitle
        </CardSubtitle>
        <CardText>This is a package description</CardText>
      </CardBody>
      <CardFooter>
        <Button className="packageButton" onClick={handlePackageSelecction}>
          Button
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PackageItem;
