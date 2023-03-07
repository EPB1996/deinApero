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
  const { id, name, description, price, productSize, image } = product;

  const [modal, setModal] = useState(false);
  const [highlight, setHighlight] = useState(false);

  const toggle = () => {
    setModal(!modal);
    !modal && setHighlight(false);
  };

  const dispatch = useAppDispatch();

  const addedProducts = useAppSelector(state => state.products[productCategory]);

  const handleAddProduct = () => {
    dispatch(addProduct({ product, productCategory }));
  };

  const handleRemoveProduct = () => {
    dispatch(removeProduct({ product, productCategory }));
  };

  const props3 = useSpring({
    boxShadow: highlight ? '0 20px 25px rgb(0 0 0 / 25%)' : '0 2px 10px rgb(0 0 0 / 8%)',
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
    <animated.div
      style={props3}
      className={`card  ${!modal ? 'cardProduct' : 'cardProductInfo'}`}
      /*  style={props3} */ onMouseEnter={() => {
        !modal && setHighlight(true);
      }}
      onMouseLeave={() => {
        !modal && setHighlight(false);
      }}
    >
      {!modal && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img className="productImage" src={`data:image/jpeg;base64,${image}`}></img>
        </div>
      )}
      {addedProducts && addedProducts[id] && (
        <div className="ribbon ribbon-orange ribbon-small ">
          <div className="banner">
            <div className="text">
              <Translate contentKey={`custom.productItem.added`}> Added</Translate>
            </div>
          </div>
        </div>
      )}

      <CardTitle tag="h5">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>{name}</div>
          <div>{price}.-</div>
        </div>
      </CardTitle>

      <CardSubtitle className="mb-2 text-muted" tag="h6">
        <div style={{ width: '50%', display: 'flex', justifyContent: 'center', margin: '0 auto' }}>
          <Button onClick={handleRemoveProduct}>-</Button>
          <div style={{ margin: 'auto 5px' }}>
            {' '}
            {addedProducts && addedProducts[id] && addedProducts[id] ? addedProducts[id].amount : 0}
          </div>
          <Button onClick={handleAddProduct}>+</Button>
        </div>
      </CardSubtitle>
      <Button onClick={toggle}>Produktbeschreibung</Button>
      <Collapse className="productBody" isOpen={modal}>
        <CardBody>
          <Row>
            <Col md={6}>
              <ImageMagnifier width="50%" src={`data:image/jpeg;base64,${image}`}></ImageMagnifier>
            </Col>
            <Col md={6}>{description}</Col>
          </Row>
        </CardBody>
      </Collapse>
    </animated.div>
  );
};

export default ProductItem;
