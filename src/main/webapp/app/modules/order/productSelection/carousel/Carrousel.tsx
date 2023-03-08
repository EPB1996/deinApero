import Carousel from 'react-spring-3d-carousel';
import React, { useState, useEffect } from 'react';
import { config } from 'react-spring';

export default function Carroussel(props) {
  const table = props.cards.map((element, index) => {
    return { ...element, onClick: () => setGoToSlide(index) };
  });

  const [offsetRadius, setOffsetRadius] = useState(2);
  const [showArrows, setShowArrows] = useState(false);
  const [goToSlide, setGoToSlide] = useState(null);
  const [cards, setCards] = useState(table);

  useEffect(() => {
    setOffsetRadius(props.offset);
    setShowArrows(props.showArrows);
    setGoToSlide(0);
    setCards(
      props.cards.map((element, index) => {
        return { ...element, onClick: () => setGoToSlide(index) };
      })
    );
  }, [props.offset, props.showArrows, props.cards]);

  return (
    <div style={{ width: props.width, height: props.height, margin: props.margin }}>
      <Carousel
        slides={cards}
        goToSlide={goToSlide}
        offsetRadius={offsetRadius}
        showNavigation={showArrows}
        animationConfig={config.gentle}
      />
    </div>
  );
}
