import React, { useState } from 'react';
import './product.scss';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardImg,
  CardImgOverlay,
  CardSubtitle,
  CardTitle,
  Col,
  Collapse,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from 'reactstrap';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { addProduct, removeProduct } from './product.reducer';
import { Slide } from 'react-awesome-reveal';
import { Translate } from 'react-jhipster';
import ImageMagnifier from './magnifier';
import { animated, useSpring } from '@react-spring/web';
const ProductItem = props => {
  const { product, productCategory, disabled = false } = props;
  const { name, description, price, productSize, image } = product;

  const [modal, setModal] = useState(false);
  const [showInfo, setShowInfo] = useState('hideInfo');

  const toggle = () => {
    setModal(!modal);
  };
  const handleMouseOver = () => {
    setShowInfo('showInfo');
    setModal(true);
  };

  const handleMouseOut = () => {
    setShowInfo('hideInfo');
    setModal(false);
  };

  const dispatch = useAppDispatch();

  const addedProducts = useAppSelector(state => state.products[productCategory]);

  const handleAddProduct = () => {
    dispatch(addProduct({ product, productCategory }));
  };

  const handleRemoveProduct = () => {
    dispatch(removeProduct({ product, productCategory }));
  };

  const [show, setShown] = useState(false);

  const props3 = useSpring({
    /* transform: show ? 'scale(1.03)' : 'scale(1)', */
    boxShadow: show ? '0 20px 25px rgb(0 0 0 / 25%)' : '0 2px 10px rgb(0 0 0 / 8%)',
  });

  /*  return (
    <Col md={12} style={{ paddingBottom: '5px' }}>
      <animated.div className="card" style={props3} onMouseEnter={() => setShown(true)} onMouseLeave={() => setShown(false)}>
        <div style={{display:"flex", justifyContent:"center"}}>
        <img  src={`data:image/jpeg;base64,${image}`}></img>
        </div>
        <h5>{name}</h5>
        <p>{description}</p>
      </animated.div>
    </Col>
  ); */

  return (
    <Card
      className={` card ${!modal ? 'cardProduct' : 'cardProductInfo'}`}
      /*  style={props3} */ onMouseEnter={() => setShown(true)}
      onMouseLeave={() => setShown(false)}
    >
      <Row>
        {!modal && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img className="productImage" src={`data:image/jpeg;base64,${image}`}></img>
          </div>
        )}
        <CardTitle tag="h5">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>{name}</div>
            <div>
              <Button onClick={handleAddProduct}>+</Button>
            </div>
          </div>
        </CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          {productSize} {price}
        </CardSubtitle>
        <Button onClick={toggle}>Mehr informationen</Button>
        <Collapse isOpen={modal}>
          <Row>
            <Col md={6}>
              <ImageMagnifier width="200px" src={`data:image/jpeg;base64,${image}`}></ImageMagnifier>
            </Col>
            <Col md={6}>{description}</Col>
          </Row>
        </Collapse>
      </Row>
    </Card>
  );
};

export default ProductItem;
