import React, { useState } from 'react';
import { Slide } from 'react-awesome-reveal';
import { Card, Col, Row } from 'reactstrap';
import Calendar from 'react-calendar';
import TimePicker from 'react-time-picker/dist/entry.nostyle';
import './dateSelection.scss';

const DateSelection = () => {
  const [date, onDateChange] = useState(new Date());
  const [time, onTimeChange] = useState('10:00');
  return (
    <Slide direction="left" duration={1500} triggerOnce>
      <Row style={{ justifyContent: 'center' }}>
        {/* <Col md={6}>
          <Card>
            <Calendar onChange={onDateChange} value={date} />
          </Card>
        </Col> */}
        <Col md={6}>
          <Card style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
            <Calendar onChange={onDateChange} value={date} />
            <div style={{ height: '15px' }}></div>
            <TimePicker hourAriaLabel={'Hour'} format={'HH:mm'} onChange={onTimeChange} value={time} disableClock={true} />
          </Card>
        </Col>
      </Row>
    </Slide>
  );
};

export default DateSelection;
