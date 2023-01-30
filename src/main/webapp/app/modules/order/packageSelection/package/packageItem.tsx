import React from 'react';
import './package.scss';
import { Button, Card, CardBody, CardFooter, CardImg, CardSubtitle, CardText, CardTitle } from 'reactstrap';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { nextStep } from '../../stepper/stepper.reducer';
import { Slide, Zoom } from 'react-awesome-reveal';
import { reset } from '../../productSelection/product/product.reducer';

const PackageItem = props => {
  const dispatch = useAppDispatch();
  const { packageType, disabled = false } = props;

  const selectedPackageType = useAppSelector(state => state.packageReducer.packageType);

  const handlePackageSelecction = () => {
    dispatch(reset());
  };

  return (
    <Card color="light" outline style={{ position: 'relative', width: '100%', height: '100%', padding: '0' }}>
      {packageType === selectedPackageType && (
        <div className="ribbon ribbon-orange ">
          <div className="banner">
            <div className="text">Selected</div>
          </div>
        </div>
      )}
      <CardBody>
        <CardTitle tag="h5">{packageType.name}</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          Package Subtitle
        </CardSubtitle>
        <CardText>This is a package description</CardText>
      </CardBody>
      {!disabled && (
        <CardFooter>
          <Button className="packageButton" onClick={handlePackageSelecction}>
            Select
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default PackageItem;
