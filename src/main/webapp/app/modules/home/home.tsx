import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { Row, Col, Alert, Button } from 'reactstrap';

import { useAppSelector } from 'app/config/store';

export const Home = () => {
  const account = useAppSelector(state => state.authentication.account);

  return (
    <Row style={{ justifyContent: 'center' }}>
      <h1 className="title">Dein Apero</h1>
      <Button>
        <Link to="/productOrder" className="alert-link">
          ORDER
        </Link>
      </Button>
    </Row>
  );
};

export default Home;
