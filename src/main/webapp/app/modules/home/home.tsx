import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { Row, Col, Alert, Button, Card, CardTitle, CardBody } from 'reactstrap';

import { useAppSelector } from 'app/config/store';

export const Home = () => {
  const account = useAppSelector(state => state.authentication.account);

  return (
    <>
      <video id="background-video" loop autoPlay>
        <source src={'../../../content/video/vecteezy_cooked-snacks-on-a-table-in-a-restaurant_2654950.mp4'} type="video/mp4" />
      </video>
      <Row style={{ justifyContent: 'center' }}>
        <Col md={6} style={{ display: 'flex', justifyContent: 'space-around', paddingTop: '10%' }}>
          <Card>
            <CardTitle tag={'h3'}>Place your Order</CardTitle>
            <CardBody>Select from different Products and get the party started!</CardBody>{' '}
            <Button>
              <Link to="/productOrder" className="alert-link">
                ORDER
              </Link>
            </Button>
          </Card>
        </Col>
        {/* <Col md={6} style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Card>
          <CardTitle tag={'h3'}>Team behind the Apero</CardTitle>
          <CardBody>Get to Know the Team behind your memorable evening!</CardBody>{' '}
          <Button>
            <Link to="/productOrder" className="alert-link">
              DeinApero Team
            </Link>
          </Button>
        </Card>
      </Col> */}
      </Row>
    </>
  );
};

export default Home;
